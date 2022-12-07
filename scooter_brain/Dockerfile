FROM python 

WORKDIR /scooter_brain    

RUN pip install --upgrade pip && \
    pip install requests

ENTRYPOINT [ "python3", "-u", "scooter_simulator.py" ]
