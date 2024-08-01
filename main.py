from fastapi import FastAPI,UploadFile,Form,Response,Depends
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from typing import Annotated
import sqlite3

con = sqlite3.connect('data.db',check_same_thread=False)
cur = con.cursor()

app = FastAPI()

SECRET = "supercoding"
manager = LoginManager(SECRET,"/login")

@app.post('/items')
async def create_items(image:UploadFile,title:Annotated[str,Form()],price:Annotated[int,Form()],description:Annotated[str,Form()],place: Annotated[str,Form()], timestamp: Annotated[int,Form()]):
    
    image_bytes = await image.read()
    cur.execute(f"""
    insert into items(title,image,price,description,place,timestamp) values ('{title}','{image_bytes.hex()}',{price},'{description}','{place}',{timestamp}) 
                """)
    con.commit()
    return '200'

@app.get('/items')
async def get_items(user=Depends(manager)):
    con.row_factory = sqlite3.Row # 컬럼명도 같이 가져옴
    cur = con.cursor()
    rows = cur.execute(f"""
        select * from items;
                       """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

@app.get('/images/{item_id}')
async def get_image(item_id):
    cur = con.cursor()
    #16진법
    image_bytes = cur.execute(f"""
                              select image from items where id={item_id};
                              """).fetchone()[0]
    return Response(content=bytes.fromhex(image_bytes))

@app.post('/signup')
def sign_up(id:Annotated[str,Form()],currentPassword:Annotated[str,Form()],em:Annotated[str,Form()],nm:Annotated[str,Form()]):
    cur.execute(f"""
                INSERT INTO USERS(id,name,em,password) VALUES ('{id}','{nm}','{em}','{currentPassword}')
                """)
    con.commit()
    return '200'

@manager.user_loader()
def query_user(data):
    WHERE_STATEMENTS = f'id="{data}"'
    if type(data) == dict:
        WHERE_STATEMENTS = f'id="{data['id']}"'
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    user = cur.execute(f"""
                       Select * from USERS where id = {WHERE_STATEMENTS}
                       """).fetchone()
    return user

@app.post('/login')
def login(id:Annotated[str,Form()],currentPassword:Annotated[str,Form()]):
    user = query_user(id)
    if not user:
        raise InvalidCredentialsException
    elif currentPassword != user['password']:
        raise InvalidCredentialsException
    elif id != user['id']:
        raise InvalidCredentialsException
    
    access_token = manager.create_access_token(data={
        'sub': {
            'name': user['name'],
            'email': user['em'],
            'id': user['id']
        }
    })
    
    return {'access_token': access_token}

app.mount('/',StaticFiles(directory="front", html=True), name="front")
