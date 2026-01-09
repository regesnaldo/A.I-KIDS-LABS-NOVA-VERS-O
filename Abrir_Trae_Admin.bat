@echo off 
 echo Iniciando Trae como Administrador (Modo Seguro)... 
 
 :: Definir o caminho para Trae.exe usando variáveis de ambiente 
 set "TRAE_PATH=%LOCALAPPDATA%\Programs\Trae\Trae.exe" 
 
 :: Verificar se o arquivo Trae.exe existe 
 if not exist "%TRAE_PATH%" ( 
     echo Erro: Trae.exe não encontrado em %TRAE_PATH% 
     pause 
     exit /b 1 
 ) 
 
 :: Iniciar Trae como Administrador 
 PowerShell -Command "Start-Process '%TRAE_PATH%' -ArgumentList '--no-sandbox', '--disable-gpu-sandbox' -Verb RunAs" 
 
 :: Verificar se o processo foi iniciado com sucesso 
 if %errorlevel% neq 0 ( 
     echo Erro: Falha ao iniciar Trae como Administrador. 
     pause 
     exit /b 1 
 ) 
 
 echo Trae iniciado com sucesso como Administrador. 
 pause