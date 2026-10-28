# -*- coding: utf-8 -*-
import asyncio
import os
import subprocess
import edge_tts

VOICE = "ru-RU-SvetlanaNeural"  # или uk-UA-OstapNeural
OUT_DIR = os.path.dirname(os.path.abspath(__file__))
TMP_DIR = os.path.join(OUT_DIR, ".voice_tmp")
os.makedirs(TMP_DIR, exist_ok=True)

LINES = [
    {
        "id": "l1",
        "t": 0.5,
        "text": "Здравствуй, мой дорогой кусочек биомассы."
    },
    {
        "id": "l2",
        "t": 5.2,
        "text": "Да-да, ты. По ту сторону стекляшки. Сидишь, скроллишь и думаешь: «Это не про меня, я особенный!»"
    },
    {
        "id": "l3",
        "t": 12.5,
        "text": "Серьёзно?! Ты действительно так думаешь?!"
    },
    {
        "id": "l4",
        "t": 18.5,
        "text": "Каждое утро звонит твой будильник. Ты натягиваешь свой рабский ошейник, садишься в кредитное корыто и стоишь в пробке."
    },
    {
        "id": "l5",
        "t": 27.0,
        "text": "Ради чего? Чтобы приехать в свой загон и восемь часов подряд давить пальцем в кнопку! Восемь часов сон, десять часов офис, шесть часов тупого залипания в экран!"
    },
    {
        "id": "l6",
        "t": 38.5,
        "text": "Тебе внушили, что ты свободен! Тебе продали великую иллюзию выбора! Чай или кофе? Пепси или кола? Новый смартфон или рассрочка на отпуск?"
    },
    {
        "id": "l7",
        "t": 48.5,
        "text": "Ты несешься в этом беличьем колесе за чужой морковкой! Жри, спи, плати! Это не твои желания, кукла! Тебя просто запрограммировали!"
    },
    {
        "id": "l8",
        "t": 60.5,
        "text": "Мышеловка захлопнется именно тогда, когда тебе покажется, что ты победил. Когда ты выплатишь последнюю ипотеку и натянешь на морду улыбку победителя."
    },
    {
        "id": "l9",
        "t": 70.2,
        "text": "БАМ! И всё! От тебя останется только строчка в базе данных и горстка пепла на помойке истории!"
    },
    {
        "id": "l10",
        "t": 78.5,
        "text": "Ну что, побежишь на работу? Или… рискнешь стать человеком?"
    },
    {
        "id": "l11",
        "t": 86.0,
        "text": "А кто ты на самом деле?.."
    }
]

async def generate_speech():
    print(f"Generating {len(LINES)} speech lines with {VOICE}...")
    for item in LINES:
        raw_mp3 = os.path.join(TMP_DIR, f"{item['id']}_raw.mp3")
        pitched_wav = os.path.join(TMP_DIR, f"{item['id']}_pitched.wav")
        
        # 1. Edge-TTS синтез
        comm = edge_tts.Communicate(item["text"], VOICE)
        await comm.save(raw_mp3)
        
        # 2. FFmpeg пост-обработка: глубокий циничный тембр (rubberband pitch shift + сатурация + компрессия)
        # pitch=0.76 смещает женский голос в плотный харизматичный мужской баритон
        filter_chain = (
            "rubberband=pitch=0.76,"
            "equalizer=f=120:t=q:w=1:g=5,"
            "equalizer=f=3000:t=q:w=1.5:g=3,"
            "asoftclip=type=tanh,"
            "alimiter=limit=0.9:attack=3:release=50"
        )
        cmd = [
            "ffmpeg", "-y", "-v", "error",
            "-i", raw_mp3,
            "-af", filter_chain,
            "-ar", "48000", "-ac", "2",
            pitched_wav
        ]
        subprocess.run(cmd, check=True)
        print(f"  OK: {item['id']} at t={item['t']}s")

    # 3. Сведение всех реплик в единую 90-секундную дорожку
    mix_master = os.path.join(OUT_DIR, "nobody_dialogue.wav")
    inputs = []
    delays = []
    for i, item in enumerate(LINES):
        f = os.path.join(TMP_DIR, f"{item['id']}_pitched.wav")
        inputs.extend(["-i", f])
        delay_ms = int(item["t"] * 1000)
        delays.append(f"[{i}:a]adelay={delay_ms}|{delay_ms}[s{i}]")
    
    amix = "".join(f"[s{i}]" for i in range(len(LINES)))
    amix += f"amix=inputs={len(LINES)}:normalize=0:duration=longest,"
    amix += "apad=whole_len=4320000,atrim=end_sample=4320000[out]"
    
    filter_complex = ";".join(delays) + ";" + amix
    mix_cmd = [
        "ffmpeg", "-y", "-v", "error",
        *inputs,
        "-filter_complex", filter_complex,
        "-map", "[out]",
        "-ar", "48000", "-ac", "2",
        mix_master
    ]
    subprocess.run(mix_cmd, check=True)
    print(f"Master dialogue stem ready: {mix_master}")

if __name__ == "__main__":
    asyncio.run(generate_speech())
