@echo off
echo Iniciando Trae como Administrador (Modo Seguro)...
powershell -Command "Start-Process 'C:\Users\REGINALDO\AppData\Local\Programs\Trae\Trae.exe' -ArgumentList '--no-sandbox', '--disable-gpu-sandbox' -Verb RunAs"
exit
