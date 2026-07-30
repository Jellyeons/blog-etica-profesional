"use strict";

/* ======================================
   ELEMENTOS DE LA PÁGINA
====================================== */

const barraProgreso = document.getElementById("barraProgreso");
const navegacion = document.getElementById("navegacion");
const botonArriba = document.getElementById("botonArriba");
const botonMenu = document.getElementById("botonMenu");
const enlacesNavegacion = document.getElementById("enlacesNavegacion");
const botonCopiar = document.getElementById("copiarUrl");
const direccionBlog = document.getElementById("direccionBlog");

const enlacesMenu = document.querySelectorAll(
    ".enlaces-navegacion a"
);

const seccionesRevelar = document.querySelectorAll(
    ".seccion-revelar"
);

/* ======================================
   BARRA DE PROGRESO
====================================== */

function actualizarProgreso() {
    const desplazamiento = window.scrollY;

    const alturaTotal =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const porcentaje =
        alturaTotal > 0
            ? (desplazamiento / alturaTotal) * 100
            : 0;

    barraProgreso.style.width = `${porcentaje}%`;
}

/* ======================================
   ESTILO DE NAVEGACIÓN AL BAJAR
====================================== */

function actualizarNavegacion() {
    if (window.scrollY > 45) {
        navegacion.classList.add("desplazada");
    } else {
        navegacion.classList.remove("desplazada");
    }
}

/* ======================================
   BOTÓN PARA VOLVER ARRIBA
====================================== */

function actualizarBotonArriba() {
    if (window.scrollY > 600) {
        botonArriba.classList.add("visible");
    } else {
        botonArriba.classList.remove("visible");
    }
}

botonArriba.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ======================================
   MENÚ PARA CELULARES
====================================== */

botonMenu.addEventListener("click", function () {
    botonMenu.classList.toggle("activo");
    enlacesNavegacion.classList.toggle("abierto");
    document.body.classList.toggle("menu-abierto");
});

enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        botonMenu.classList.remove("activo");
        enlacesNavegacion.classList.remove("abierto");
        document.body.classList.remove("menu-abierto");
    });
});

/* ======================================
   ANIMACIÓN AL DESPLAZARSE
====================================== */

const observador = new IntersectionObserver(
    function (elementos) {
        elementos.forEach(function (elemento) {
            if (elemento.isIntersecting) {
                elemento.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.12
    }
);

seccionesRevelar.forEach(function (seccion) {
    observador.observe(seccion);
});

/* ======================================
   ENLACE ACTIVO DEL MENÚ
====================================== */

const seccionesMenu = [
    document.getElementById("inicio"),
    document.getElementById("etica-profesional"),
    document.getElementById("valores"),
    document.getElementById("pei"),
    document.getElementById("paradigmas")
];

function actualizarEnlaceActivo() {
    let seccionActual = "inicio";

    seccionesMenu.forEach(function (seccion) {
        if (!seccion) {
            return;
        }

        const posicion = seccion.offsetTop - 180;

        if (window.scrollY >= posicion) {
            seccionActual = seccion.id;
        }
    });

    enlacesMenu.forEach(function (enlace) {
        enlace.classList.remove("activo");

        const destino = enlace
            .getAttribute("href")
            .replace("#", "");

        if (destino === seccionActual) {
            enlace.classList.add("activo");
        }
    });
}

/* ======================================
   COPIAR DIRECCIÓN DEL BLOG
====================================== */

botonCopiar.addEventListener("click", async function () {
    const texto = direccionBlog.textContent.trim();

    try {
        await navigator.clipboard.writeText(texto);

        botonCopiar.textContent = "Enlace copiado";

        setTimeout(function () {
            botonCopiar.textContent = "Copiar enlace";
        }, 2000);
    } catch (error) {
        console.error("No fue posible copiar el enlace:", error);

        botonCopiar.textContent = "Copia manualmente";

        setTimeout(function () {
            botonCopiar.textContent = "Copiar enlace";
        }, 2000);
    }
});

/* ======================================
   EVENTO GENERAL DE DESPLAZAMIENTO
====================================== */

window.addEventListener("scroll", function () {
    actualizarProgreso();
    actualizarNavegacion();
    actualizarBotonArriba();
    actualizarEnlaceActivo();
});

/* ======================================
   CONFIGURACIÓN INICIAL
====================================== */

actualizarProgreso();
actualizarNavegacion();
actualizarBotonArriba();
actualizarEnlaceActivo();