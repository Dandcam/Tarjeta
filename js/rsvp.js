const SUPABASE_URL = "https://kmaqalkxedhpaougfspw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttYXFhbGt4ZWRocGFvdWdmc3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDk5MTEsImV4cCI6MjA5OTEyNTkxMX0.TOVXhNL9w4JPWxLQwfb8Ufd6T_HCBZlLvkU45ool_6M";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("rsvp-form");
    const submitBtn = document.getElementById("submit-rsvp");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nombre = document.getElementById("name").value.trim();
        const acompañante = document.getElementById("name_acompañante").value.trim();
        const telefono = document.getElementById("phone").value.trim();
        const asistencia = document.getElementById("attendance").value;
        // Campo trampa anti-spam (ver nota en index.html)
        const honeypot = document.getElementById("website");

        if (!nombre || !acompañante || !asistencia || !telefono) {
            alert("Por favor completa todos los campos");
            return;
        }

        // Si el honeypot viene lleno, es un bot: fingimos éxito y salimos
        if (honeypot && honeypot.value) {
            form.reset();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        const { error } = await supabaseClient
            .from("confirmaciones")
            .insert([{ nombre, acompañante, asistencia, telefono }]);

        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar Confirmación";

        if (error) {
            console.error("Error al guardar confirmación:", error);
            if (error.code === "23505") {
                alert("Ya registramos una confirmación con ese nombre. Si necesitas corregirla, escríbenos directamente.");
            } else {
                alert("Ocurrió un problema al enviar tu confirmación. Por favor intenta de nuevo en unos segundos.");
            }
            return;
        }

        // Éxito real y confirmado por la base de datos
        if (window.confetti) {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
        abrirModal();
        form.reset();
    });
});

function abrirModal() {
    document.getElementById("modal-confirmacion").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal-confirmacion").style.display = "none";
}
