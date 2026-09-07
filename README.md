# Hola, soy Álvaro Molina Mateo

Este es mi CV en formato web. Estoy estudiando Desarrollo de Aplicaciones Web en el IES Severo Ochoa y aquí comparto quién soy, mi formación, una selección de mi experiencia laboral y las tecnologías con las que trabajo.

He planteado este proyecto como una presentación personal sencilla de explorar desde el móvil o el ordenador, con una identidad visual en rojo sangre y un monograma **ÁM** diseñado en SVG.

## Qué puedes encontrar

- Mi presentación y accesos directos a formación, experiencia, tecnologías e idiomas.
- Una sección sobre mí escrita en primera persona, con mis datos de contacto debajo.
- Mi experiencia más relevante y mi formación, diferenciando los estudios en curso de los finalizados.
- Mis habilidades con HTML, CSS, WordPress y WooCommerce, Java, Python y Git.
- Mis idiomas, aptitudes y un enlace para descargar mi CV en PDF.
- Un formulario que prepara un correo para enviármelo desde tu aplicación de email. No envía mensajes por sí solo ni guarda datos en un servidor.

## Cómo está hecha

Uso **HTML, CSS y JavaScript**, sin frameworks ni un proceso de compilación. La web incluye modo día y noche, recuerda el tema cuando el navegador permite almacenamiento local y adapta su distribución al tamaño de la pantalla.

También incluye navegación por secciones, indicador de lectura, animaciones suaves y un botón para volver arriba. He añadido foco visible para navegar con teclado, un acceso para saltar al contenido y compatibilidad con la preferencia de movimiento reducido.

## Estructura del proyecto

```text
index.html                         # Contenido de mi CV
assets/
  css/style.css                    # Diseño, temas y adaptación a pantallas
  js/main.js                       # Navegación, tema y formulario
  img/monogram.svg                  # Mi identidad visual ÁM y favicon
  img/profile.png                   # Imagen original conservada
  cv/CV-Alvaro-Molina-Mateo.pdf      # Mi CV descargable
```

## Verlo en local

Desde la carpeta del proyecto ejecuto:

```bash
python -m http.server 8000
```

Después abro [localhost:8000](http://localhost:8000). También puedo abrir `index.html` directamente para revisar el contenido.

## Publicación y mantenimiento

El proyecto está preparado para GitHub Pages sirviendo la raíz de la rama `main`. Mantengo el contenido en `index.html`, los colores en las variables de `assets/css/style.css` y las interacciones en `assets/js/main.js`.

El PDF es un archivo independiente: los cambios en la web no modifican automáticamente su contenido.

## Contacto

Puedes escribirme a [alvaromolmateo@gmail.com](mailto:alvaromolmateo@gmail.com) o visitar [mi perfil de GitHub](https://github.com/alvaromolmateo-cmd).
