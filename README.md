# fichar
Script Node con Playwright para fichar

███████╗██╗ ██████╗██╗  ██╗ █████╗      ██╗███████╗
██╔════╝██║██╔════╝██║  ██║██╔══██╗     ██║██╔════╝
█████╗  ██║██║     ███████║███████║     ██║█████╗  
██╔══╝  ██║██║     ██╔══██║██╔══██║██   ██║██╔══╝  
██║     ██║╚██████╗██║  ██║██║  ██║╚█████╔╝███████╗
╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝ ╚══════╝
https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=FICHAJE

Requisitos iniciales:
Para que funcionen los scripts .bat, en el package.json deben aparecer dentro de scripts:
    "start": "node fichar.js"
Hay que crear en la raiz del proyecto un fichero "user.json" que contenga el usuario y el password que va a realizar el login en la pagina del fichaje.
Crear el fichero user.json con la siguiente estructura:
    {
        "username": "11111111A",
        "password": "1111",
        "longitude": 41.111111, 
        "latitude": 2.111111
    }

Si no se crea el fichero user.json hara login con los campos del usuario por defecto indicados en el fichero fichar.js

Para fichar por las mañanas de forma automatica:
1. Hacer un run de "shell:startup"
2. Copiar dentro el fichero /scripts/start_up.bat. Después revisar des del Administrador de tareas, que en la pestaña Inicio se ha creado el start_up.bat y está habilitado
3. Explicación detallada: https://www.youtube.com/watch?v=nF9TiL34FT0
4. Cada vez que se inicie el PC deberia realizar el fichaje de forma automatica

Para fichar por las tardes de forma automatica:
1. Crear tarea programada para que se realize el fichaje todas las tareas, de lunes a jueves a las 18:00 y los viernes a las 15:00.
2. En la tarea programada, agregar el fichero /scripts/fichaje_end.bat
TODO: Probar si con la tarea programada arranca automaticamente el PC? En caso afirmativo, el start_up.bat se puede reemplazar y usar también para las mañanas el fichaje_end.bat