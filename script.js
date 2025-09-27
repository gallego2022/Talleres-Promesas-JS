const casos = [
  {
    id: 1,
    titulo: "Leer archivo local",
    descripcion: "Simula la lectura de un archivo y devuelve una promesa.",
    ejecutar: () => {
      return new Promise((resolve, reject) => {
        const path = "archivo.png";
        if (path) {
          resolve("Contenido leído correctamente.");
        } else {
          reject("Error al leer el archivo.");
        }
      });
    }
  },
  {
    id: 2,
    titulo: "Esperar cierto tiempo",
    descripcion: "Resuelve una promesa después de 2 segundos.",
    ejecutar: () => {
      return new Promise(resolve => {
        setTimeout(() => resolve("Esperaste 2 segundos."), 2000);
      });
    }
  },
  {
    id: 3,
    titulo: "Llamar a una API con fetch",
    descripcion: "Obtiene datos desde una API pública.",
    ejecutar: () => {
      return fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => res.json())
        .then(data => JSON.stringify(data, null, 2));
    }
  },
  {
    id: 4,
    titulo: "Validar login simulado",
    descripcion: "Valida usuario y contraseña usando una promesa.",
    ejecutar: () => {
      return new Promise((resolve, reject) => {
        const usuario = "admin";
        const clave = "123";
        if (usuario === "admin" && clave === "123") {
          resolve("Bienvenido");
        } else {
          reject("Error, datos incorrectos");
        }
      });
    }
  },
  {
    id: 5,
    titulo: "Cargar imagen",
    descripcion: "Carga una imagen con promesa.",
    ejecutar: () => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve("Imagen cargada");
        img.onerror = () => reject("Error al cargar imagen");
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw0X5O2dLKLVimbJ54fiBoXsdOg5jfh1B7Bg&s";
      });
    }
  },
  {
    id: 6,
    titulo: "Enviar formulario simulado",
    descripcion: "Simula validación de formulario con promesa.",
    ejecutar: () => {
      return new Promise((resolve, reject) => {
        const datos = { nombre: "Juan", email: "juan@example.com" };
        if (datos.nombre && datos.email) {
          resolve("Formulario enviado");
        } else {
          reject("Error de validación");
        }
      });
    }
  },
  {
    id: 7,
    titulo: "Obtener localización del usuario",
    descripcion: "Usa geolocalización para obtener ubicación.",
    ejecutar: () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          pos => resolve(`Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`),
          err => reject("Permiso denegado o error")
        );
      });
    }
  },
  {
    id: 8,
    titulo: "Cadena de promesas (login → perfil)",
    descripcion: "Simula un login exitoso y luego carga los datos del perfil del usuario.",
    ejecutar: () => {
      function login(usuario, clave) {
        return new Promise((resolve, reject) => {
          if (usuario === "admin" && clave === "123") {
            resolve(usuario);
          } else {
            reject("Credenciales inválidas");
          }
        });
      }
  
      function obtenerPerfil(usuario) {
        return new Promise(resolve => {
          setTimeout(() => {
            const perfil = {
              nombre: "Administrador",
              correo: "admin@example.com",
              rol: "Admin"
            };
            resolve(perfil);
          }, 1000);
        });
      }
  
      return login("admin", "123")
        .then(usuario => obtenerPerfil(usuario))
        .then(perfil => `Nombre: ${perfil.nombre}\nCorreo: ${perfil.correo}\nRol: ${perfil.rol}`);
    }
  },
  {
    id: 9,
    titulo: "Leer múltiples archivos (Promise.all)",
    descripcion: "Lee varios archivos simulados al mismo tiempo.",
    ejecutar: () => {
      function leerArchivo(nombre) {
        return Promise.resolve(`Contenido de ${nombre}`);
      }
      return Promise.all([
        leerArchivo("a.txt"),
        leerArchivo("b.png")
      ]).then(res => res.join(" | "));
    }
  },
  {
    id: 10,
    titulo: "Ejecutar promesas en secuencia",
    descripcion: "Lee tres archivos simulados uno tras otro.",
    ejecutar: () => {
      function leer(nombre) {
        return Promise.resolve(`Leído: ${nombre}`);
      }
      return leer("a.txt")
        .then(() => leer("b.txt"))
        .then(() => leer("c.txt"))
        .then(() => "Todos los archivos leídos en orden");
    }
  },
  {
    id: 11,
    titulo: "Simular compra online",
    descripcion: "Valida stock y procesa pago.",
    ejecutar: () => {
      function validarStock(producto) {
        return Promise.resolve("Stock validado");
      }
      function procesarPago(tarjeta) {
        return Promise.resolve("Pago realizado");
      }
      return validarStock("Producto 1")
        .then(procesarPago)
        .then(() => "Compra exitosa");
    }
  },
  {
    id: 12,
    titulo: "Verificar sesión",
    descripcion: "Verifica un token de sesión.",
    ejecutar: () => {
      const token = "abc123";
      return new Promise((resolve, reject) => {
        if (token === "abc123") {
          resolve("Sesión activa");
        } else {
          reject("Caducado");
        }
      });
    }
  },
  {
    id: 13,
    titulo: "Cargar múltiples imágenes",
    descripcion: "Carga varias imágenes con Promise.all.",
    ejecutar: () => {
      function cargarImagen(url) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve("✅ " + url);
          img.onerror = () => reject("❌ " + url);
          img.src = url;
        });
      }
      const urls = [
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/200"
      ];
      return Promise.all(urls.map(cargarImagen))
        .then(res => res.join(", "));
    }
  },
  {
    id: 14,
    titulo: "Cancelar una promesa",
    descripcion: "Ejemplo con AbortController en fetch.",
    ejecutar: () => {
      const controller = new AbortController();
      const signal = controller.signal;
      setTimeout(() => controller.abort(), 100); // Cancela rápidamente
      return fetch("https://jsonplaceholder.typicode.com/posts", { signal })
        .then(res => res.json())
        .catch(err => "Cancelado: " + err.name);
    }
  },
  {
    id: 15,
    titulo: "Reintentar operación",
    descripcion: "Intenta ejecutar una función hasta 3 veces, con retraso entre intentos.",
    ejecutar: () => {
      let intentos = 3;
      let fallos = 0;
  
      // Retardo entre reintentos
      function esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
  
      // Función que reintenta tras esperar
      function reintentar(fn, n) {
        return fn().catch(async err => {
          console.log(`Intento fallido. Quedan ${n - 1} intentos...`);
          if (n > 1) {
            await esperar(500); // espera medio segundo
            return reintentar(fn, n - 1);
          } else {
            throw "Todos los intentos fallaron";
          }
        });
      }
  
      return reintentar(() => {
        return new Promise((resolve, reject) => {
          fallos++;
          console.log(`Ejecutando intento ${fallos}`);
          if (fallos === 3) {
            resolve("✅ Éxito al 3er intento");
          } else {
            reject("❌ Fallo");
          }
        });
      }, intentos);
    }
  },
  {
    id: 16,
    titulo: "Tiempo máximo de espera",
    descripcion: "Timeout con Promise.race.",
    ejecutar: () => {
      function esperar(ms) {
        return new Promise(resolve => setTimeout(() => resolve("Tardó " + ms + "ms"), ms));
      }
      const timeout = new Promise((_, reject) => setTimeout(() => reject("Timeout"), 1000));
      return Promise.race([esperar(2000), timeout]);
    }
  },
  {
    id: 17,
    titulo: "Simular base de datos",
    descripcion: "Busca un usuario simulado.",
    ejecutar: () => {
      const db = { 1: "Ana", 2: "Luis" };
      const id = 2;
      return new Promise((resolve, reject) => {
        if (db[id]) resolve("Usuario: " + db[id]);
        else reject("No encontrado");
      });
    }
  },
  {
    id: 18,
    titulo: "Cargar JSON local",
    descripcion: "Devuelve un objeto tras retardo simulado.",
    ejecutar: () => {
      return new Promise(resolve => {
        setTimeout(() => resolve(JSON.stringify({ nombre: "Test" })), 500);
      });
    }
  },
  {
    id: 19,
    titulo: "Esperar múltiples tiempos",
    descripcion: "Varias esperas al mismo tiempo.",
    ejecutar: () => {
      const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));
      return Promise.all([esperar(1000), esperar(2000)]).then(() => "Listo");
    }
  },
  {
    id: 20,
    titulo: "Crear secuencia de pasos",
    descripcion: "Paso 1 → Paso 2 → Paso 3",
    ejecutar: () => {
      const paso = n => Promise.resolve("Paso " + n + " completado");
      return paso(1).then(() => paso(2)).then(() => paso(3));
    }
  },
  {
    id: 21,
    titulo: "Validar formulario con promesas",
    descripcion: "Valida nombre y correo por separado.",
    ejecutar: () => {
      function validarNombre(n) {
        return new Promise((resolve, reject) => n ? resolve() : reject("Nombre requerido"));
      }
      function validarCorreo(c) {
        return new Promise((resolve, reject) => c.includes("@") ? resolve() : reject("Correo inválido"));
      }
      return Promise.all([
        validarNombre("Pedro"),
        validarCorreo("pedro@mail.com")
      ]).then(() => "Formulario válido");
    }
  },
  {
    id: 22,
    titulo: "Promesa con condición",
    descripcion: "Evalúa un valor numérico.",
    ejecutar: () => {
      const valor = 15;
      return new Promise((resolve, reject) => {
        if (valor > 10) resolve("Valor válido");
        else reject("Valor insuficiente");
      });
    }
  },
  {
    id: 23,
    titulo: "Encadenar valores modificados",
    descripcion: "Multiplica valores en cadena.",
    ejecutar: () => {
      return Promise.resolve(2)
        .then(v => v * 2)
        .then(v => v * 3)
        .then(v => "Resultado: " + v);
    }
  },
  {
    id: 24,
    titulo: "Lectura de sensor (simulado)",
    descripcion: "Devuelve un valor de sensor tras delay.",
    ejecutar: () => {
      return new Promise(resolve => {
        setTimeout(() => resolve("Temperatura: 35°C"), 1000);
      });
    }
  },
  {
    id: 25,
    titulo: "Control de errores con catch",
    descripcion: "Maneja errores de forma explícita.",
    ejecutar: () => {
      function leerArchivo(nombre) {
        return new Promise((_, reject) => reject("Archivo no existe"));
      }
      return leerArchivo("inexistente.txt")
        .then(r => r)
        .catch(err => "Error capturado: " + err);
    }
  }
  
];

// Generar lista en el sidebar
const lista = document.getElementById("casosList");
casos.forEach(caso => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="w-full text-left px-3 py-2 hover:bg-gray-700 rounded" data-id="${caso.id}">${caso.titulo}</button>`;
  lista.appendChild(li);
});

// Modal y lógica de ejecución
const modal = document.getElementById("modalCaso");
const cerrarModal = document.getElementById("cerrarModal");
const titulo = document.getElementById("tituloCaso");
const descripcion = document.getElementById("descripcionCaso");
const ejecutarBtn = document.getElementById("ejecutarCaso");
const resultado = document.getElementById("resultadoCaso");

let casoActual = null;

lista.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = parseInt(btn.dataset.id);
  casoActual = casos.find(c => c.id === id);
  titulo.textContent = casoActual.titulo;
  descripcion.textContent = casoActual.descripcion;
  resultado.textContent = "";
  modal.classList.remove("hidden");
});

cerrarModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

ejecutarBtn.addEventListener("click", () => {
  if (!casoActual) return;
  resultado.textContent = "Ejecutando...";
  casoActual.ejecutar()
    .then(res => resultado.textContent = res)
    .catch(err => resultado.textContent = err);
});
