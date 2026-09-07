# CV Álvaro Molina Mateo

Web personal tipo CV/portfolio para Álvaro Molina Mateo, estudiante del Grado Superior de
Desarrollo de Aplicaciones Web. Presenta formación, experiencia laboral y habilidades en un
formato de una sola página con animaciones al hacer scroll.

## Características

- Diseño de una sola página con navegación por anclas y resaltado activo (scrollspy)
- Modo claro / oscuro con persistencia en `localStorage`
- Animaciones de aparición al hacer scroll (`IntersectionObserver`)
- Contadores animados y barras de progreso de idiomas
- Timeline de experiencia y formación
- Formulario de contacto que abre el cliente de correo con el mensaje ya redactado
- Totalmente responsive (móvil, tablet, escritorio)
- Botón de descarga del CV en PDF

## Tecnologías

HTML5, CSS3 (variables, grid, animaciones) y JavaScript vanilla. Sin frameworks ni dependencias
de build — se sirve directamente como sitio estático.

## Estructura

```
index.html
assets/
  css/style.css
  js/main.js
  img/profile.png
  cv/CV-Alvaro-Molina-Mateo.pdf
```

## Ejecutar en local

```bash
python -m http.server 8000
```

Y abrir `http://localhost:8000`.

## Despliegue

Pensado para desplegarse con GitHub Pages directamente desde la rama `main`.
