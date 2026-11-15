# Hola, soy Álvaro Molina Mateo

Este es mi CV en formato web, centrado en la informática. Estudio 2º del Grado Superior de **Desarrollo de Aplicaciones Web** en el IES Severo Ochoa y soy técnico en **Sistemas Microinformáticos y Redes**. Aquí comparto mi experiencia en el sector, mis proyectos personales, mi formación y las tecnologías con las que trabajo.

La identidad visual mantiene el rojo sangre y el monograma **ÁM** diseñado en SVG, con un acabado más editorial: tipografía grande, detalles en cursiva serif y animaciones ligadas al scroll.

## Qué puedes encontrar

- **Perfil**: una presentación breve, cifras clave y mis datos de contacto.
- **Experiencia en informática**: NTT DATA, Hawk Training Center, soporte técnico en una empresa teleoperadora y GlobalCopy, en una línea de tiempo que se rellena al avanzar.
- **Proyectos personales**: HabitTracker, Gym Tracker y NutriPlan, con capturas reales (en modo oscuro) en tarjetas que se apilan al hacer scroll.
- **Formación**: Grado Superior DAW (en curso) y Grado Medio SMR (finalizado).
- **Competencias**: web, programación, herramientas y soporte técnico, además de idiomas y cualidades personales.
- **CV descargable** en PDF (también se abre en el navegador al pulsar el dibujo de la hoja) y un formulario que prepara un correo en tu aplicación de email (no envía nada por sí solo ni guarda datos).

## Cómo está hecha

Uso **HTML, CSS y JavaScript**, sin frameworks ni proceso de compilación.

- Modo día y noche que se recuerda entre visitas, aplicado antes de pintar para evitar parpadeos.
- Animaciones de scroll con un único `requestAnimationFrame`: hero que se aleja, línea de tiempo, tarjetas apiladas, parallax suave y hoja del CV que se endereza.
- Detalles de escritorio: indicador deslizante en el menú, monograma con inclinación 3D, brillo que sigue al cursor y botones magnéticos.
- Pensada para portátiles con poca altura y para móvil: menú a pantalla completa, botón flotante para descargar el CV, zonas seguras del iPhone y campos de 16 px para evitar el zoom en iOS.
- Accesible: enlace para saltar al contenido, foco visible, soporte de movimiento reducido y estilos de impresión.

## Estructura del proyecto

```text
index.html                          # Contenido de mi CV
assets/
  css/style.css                     # Diseño, temas y adaptación a pantallas
  js/main.js                        # Navegación, animaciones de scroll, tema y formulario
  img/monogram.svg                  # Mi identidad visual ÁM y favicon
  img/profile.png                   # Imagen original conservada
  img/projects/*.png                # Capturas de mis proyectos
  cv/CV-Alvaro-Molina-Mateo.pdf     # Mi CV descargable
```

## Verlo en local

Desde la carpeta del proyecto ejecuto:

```bash
python -m http.server 8000
```

Después abro [localhost:8000](http://localhost:8000).

## Publicación y mantenimiento

El proyecto está preparado para GitHub Pages sirviendo la raíz de la rama `main`. Mantengo el contenido en `index.html`, los colores en las variables de `assets/css/style.css` y las interacciones en `assets/js/main.js`.

El PDF es un archivo independiente: cuando actualizo mi CV, sustituyo `assets/cv/CV-Alvaro-Molina-Mateo.pdf` y reviso que la web diga lo mismo.

## Contacto

Puedes escribirme a [alvaromolmateo@gmail.com](mailto:alvaromolmateo@gmail.com) o visitar [mi perfil de GitHub](https://github.com/alvaromolmateo-cmd).
