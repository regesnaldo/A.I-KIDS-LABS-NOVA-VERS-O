import pytest

def test_register_success(client):
    res = client.post("/api/auth/register", json={
        "email": "teste@kidslabs.com",
        "password": "123456"
    })
    assert res.status_code == 201

def test_register_duplicate_email(client):
    client.post("/api/auth/register", json={
        "email": "dup@kidslabs.com",
        "password": "123456"
    })

    res = client.post("/api/auth/register", json={
        "email": "dup@kidslabs.com",
        "password": "123456"
    })

    assert res.status_code == 409

def test_login_success(client):
    client.post("/api/auth/register", json={
        "email": "login@kidslabs.com",
        "password": "123456"
    })

    res = client.post("/api/auth/login", json={
        "email": "login@kidslabs.com",
        "password": "123456"
    })

    assert res.status_code == 200
    assert "access_token" in res.json

def test_login_wrong_password(client):
    client.post("/api/auth/register", json={
        "email": "errado@kidslabs.com",
        "password": "123456"
    })

    res = client.post("/api/auth/login", json={
        "email": "errado@kidslabs.com",
        "password": "senhaerrada"
    })

    assert res.status_code == 401
