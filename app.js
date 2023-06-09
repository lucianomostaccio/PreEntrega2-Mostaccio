const montoPrestamo = document.querySelector("#monto_prestamo");
const duracion = document.querySelector("#duracion_prestamo");
const tasa = document.querySelector("#interes_prestamo");
const cuota = document.querySelector(".prestamo_cuota");
const montoPrestado = document.querySelector(".monto_prestamo");
const total = document.querySelector(".prestamo_total");
const interes = document.querySelector(".prestamo_tasa_interes");
const submitBtn = document.querySelector(".calculadora-btn");
const buscarBtn = document.querySelector("#buscarBtn");
const limpiarBtn = document.querySelector("#limpiarBtn");

const historialPrestamos = []; // crear array para almacenar los préstamos

// Evento de "click" al botón
submitBtn.addEventListener("click", function () {
  let inputsValidos = true; // variable booleana que se inicializa en true

  while (true) {
    monto = parseFloat(montoPrestamo.value);
    if (!monto || monto <= 0) {
      alert("El monto debe ser un número mayor a cero.");
      inputsValidos = false; // si no se cumple el criterio, se cambia la variable a false
      break;
    } else {
      break;
    }
  }
  while (true) {
    plazo = parseFloat(duracion.value);
    if (!plazo || plazo <= 0) {
      alert("La duración debe ser un número mayor a cero.");
      inputsValidos = false; // si no se cumple el criterio, se cambia la variable a false
      break;
    } else {
      break;
    }
  }
  while (true) {
    tasaAnual = parseFloat(tasa.value);
    if (!tasaAnual || tasaAnual <= 0) {
      alert("La tasa de interés debe ser un número mayor a cero.");
      inputsValidos = false; // si no se cumple el criterio, se cambia la variable a false
      break;
    } else {
      break;
    }
  }

  // Si los inputs son válidos...
  if (inputsValidos) {
    const textoHistorial = document.querySelector("#textoHistorial");
    textoHistorial.style.display = "none";
    buscarBtn.style.display = "block";

    // Cálculo de la tasa mensual
    let tasaMensual = tasaAnual / 1200;

    // Cálculo de la cuota mensual
    let cuotaMensual =
      (monto * tasaMensual) / (1 - (1 + tasaMensual) ** -plazo);

    // Cálculo del total a pagar
    let totalPago = cuotaMensual * plazo;

    // Cálculo del total de intereses
    let totalInteres = totalPago - monto;

    // Actualizar los valores
    cuota.innerHTML = cuotaMensual.toFixed(2);
    montoPrestado.innerHTML = Math.floor(monto);
    total.innerHTML = totalPago.toFixed(2);
    interes.innerHTML = totalInteres.toFixed(2);

    // Crear el gráfico del préstamo
    let xValues = [`Monto prestado`, `Interés`];
    let yValues = [monto, totalInteres];
    let barColors = [`#961251`, `#000000`];

    new Chart(`graficoPrestamo`, {
      type: `pie`,
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
      options: {
        title: {
          display: false,
        },
      },
    });
    // Crear objeto con datos del préstamo para almacenar
    const prestamo = {
      monto: monto.toFixed(2),
      duración: plazo,
      tasa: tasaAnual.toFixed(2),
      cuota: cuotaMensual.toFixed(2),
      Pago_total: totalPago.toFixed(2),
      Interes_total: totalInteres.toFixed(2),
    };

    // Almacenar objeto en array
    historialPrestamos.push(prestamo);

    // Limpiar campos de entrada
    montoPrestamo.value = "";
    duracion.value = "";
    tasa.value = "";

    // Mostrar mensaje de éxito
    alert(
      "Préstamo almacenado en el historial de préstamos calculados (VER CONSOLA)"
    );
    // Mostrar array en consola
    console.log("Historial de préstamos calculados:", historialPrestamos);

    buscarBtn.addEventListener("click", function () {
      const palabraClave = prompt(
        "Ingrese un monto, una duración, una tasa, una cuota, o un monto de interés total para buscar préstamos en el historial:"
      );

      // Filtrar préstamos que coinciden con la palabra clave
      const prestamosCoincidentes = historialPrestamos.filter(function (
        prestamo
      ) {
        const valoresPrestamo = Object.values(prestamo);
        return valoresPrestamo.some(function (valor) {
          return valor
            .toString()
            .includes(palabraClave);
        });
      });

      alert("Ver resultados de búsqueda en consola");
      // Mostrar resultados en la consola
      console.log(
        `Se encontraron ${prestamosCoincidentes.length} préstamos que coinciden con "${palabraClave}":`
      );
      console.table(prestamosCoincidentes);
    });
  }
});

//CÓDIGO DE PRUEBA:
    //botón limpiar resultados gráfico
    // limpiarBtn.addEventListener("click", function () {
    //   cuota.innerHTML = "";
    //   montoPrestado.innerHTML = "";
    //   total.innerHTML = "";
    //   interes.innerHTML = "";
    //   const limpiarGrafico = document.querySelector("#graficoPrestamo");
    //   limpiarGrafico.style.display = "none"; // borrar gráfico de torta
    // });
