import fastapi

app = fastapi.FastAPI()


@app.get("/root")
def hello():
    return {"hello": "hi"}
