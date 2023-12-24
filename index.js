function filterName(c) {
    let findName = prompt("Ingrese el nombre de la divisa a buscar: ");

    const foundName = c.filter((c) =>
        c.name.toLowerCase().includes(findName.toLowerCase())
    );

    if (foundName.length > 0) {
        console.log("Divisas encontradas: ");
        foundName.forEach((c) => {
            console.log(
                `Nombre: ${c.name}, Compra: ${c.buy}, Venta: ${c.sell}, Codigo: ${c.cod}`
            );
        });
    } else {
        alert("No se encuentra la divisa");
    }
}

function filterPrice(c) {
    op = parseInt(prompt("Filtar por: \n1: Compra \n2: Venta \n3: Volver"));
    while (op !== 3) {
        switch (op) {
            case 1:
                //Filtrar por Compra
                filterBuy(c);
                break;
            case 2:
                //Filtrar por Venta
                filterSell(c);
                break;
            default:
                break;
        }
        op = parseInt(prompt("Filtar por: \n1: Compra \n2: Venta \n3: Volver"));
    }

    alert("Volver al Menu principal.");
}

function filterBuy(c) {
    let maxBuyPrice = parseInt(prompt("Precio mayor a : "));
    const maxBuyCurrency = c.filter((c) => c.buy >= maxBuyPrice);

    if (maxBuyCurrency.length > 0) {
        console.log("Divisas encontradas: ");
        maxBuyCurrency.forEach((c) => {
            console.log(`Divisa: ${c.name} Precio Compra: ${c.buy}`);
        });
    } else {
        alert("No existe");
    }
}

function filterSell(c) {
    let maxSellPrice = parseInt(prompt("Precio mayor a: "));
    const maxSellCurrency = c.filter((c) => c.sell >= maxSellPrice);

    if (maxSellCurrency.length > 0) {
        console.log("Divisas encontradas: ");
        maxSellCurrency.forEach((c) => {
            console.log(`Divisa: ${c.name} Precio Venta: ${c.sell}`);
        });
    } else {
        alert("No existe");
    }
}

function amount(myAmount) {
    op = parseInt(
        prompt(
            "Elija una opción:\nSaldo Actual: " +
            myAmount +
            " \n1: Cargar monto \n2: Dejar de cargar"
        )
    );
    while (op !== 2) {
        switch (op) {
            case 1:
                let newAmount = parseInt(prompt("Cargar nuevo monto: "));
                myAmount += newAmount;
            default:
                break;
        }
        op = parseInt(
            prompt(
                "Elija una opción:\nSaldo Actual: " +
                myAmount +
                " \n1: Cargar monto \n2: Dejar de cargar"
            )
        );
    }

    alert("Volver al Menu principal.");
    return myAmount;
}


function buyWallet(myAmount, myWallet, currency) {
    console.log("Seleccione la divisa que desea comprar:");

    currency.forEach((c) => {
        console.log(`ID: ${c.id}, Divisa: ${c.name} (${c.cod}) , Precio Compra: ${c.buy}`);
    });

    let selectedCurrencyId = parseInt(prompt("Ingrese el ID de la divisa: "));
    let selectedCurrency = currency.find((c) => c.id === selectedCurrencyId);

    if (!selectedCurrency) {
        alert("Divisa no válida.");
        return;
    }

    let quantity = parseInt(prompt(`Ingrese la cantidad de ${selectedCurrency.name} que desea comprar: `));

    if (quantity * selectedCurrency.buy > myAmount) {
        alert("Saldo insuficiente.");
        return;
    }

    myAmount -= quantity * selectedCurrency.buy;
    myWallet.push({ ...selectedCurrency, quantity });

    console.log(`Compra exitosa. Saldo restante: ${myAmount}`);
}

function sellWallet(myAmount, myWallet) {
    if (myWallet.length === 0) {
        alert("No tienes divisas para vender.");
        return;
    }

    console.log("Seleccione la divisa que desea vender:");
    myWallet.forEach((c, index) => {
        console.log(`ID: ${index + 1}, Divisa: ${c.name} (${c.cod}) , Cantidad: ${c.quantity}, Precio Venta: ${c.sell}`);
    });

    let selectedIndex = parseInt(prompt("Ingrese el ID de la divisa que desea vender: ")) - 1;
    let selectedCurrency = myWallet[selectedIndex];

    if (!selectedCurrency) {
        alert("Divisa no válida.");
        return;
    }

    let sellQuantity = parseInt(prompt(`Ingrese la cantidad de ${selectedCurrency.name} que desea vender: `));

    if (sellQuantity <= 0 || sellQuantity > selectedCurrency.quantity) {
        alert("Cantidad no válida.");
        return;
    }

    let sellAmount = sellQuantity * selectedCurrency.sell;
    myAmount += sellAmount;
    selectedCurrency.quantity -= sellQuantity;

    console.log(`Venta exitosa. Saldo actual: ${myAmount}, Cantidad restante: ${selectedCurrency.quantity} de ${selectedCurrency.name}`);

    // Eliminar la divisa del array si se vendió completamente
    if (selectedCurrency.quantity === 0) {
        myWallet.splice(selectedIndex, 1);
    }
}


function validAmount(myAmount, myWallet, currency) {
    while (myAmount >= 1) {
        op = parseInt(prompt("Elija una opción \n1: Comprar \n2: Vender \n3: Volver al menú principal"));

        switch (op) {
            case 1:
                myAmount = buyWallet(myAmount, myWallet, currency);
                break;
            case 2:
                myAmount = sellWallet(myAmount, myWallet);
                break;
            case 3:
                return myAmount;
            default:
                alert("Opción incorrecta");
                break;
        }
    }
    return myAmount;
}



const currency = [
    {
        id: 1,
        name: "Dolar Oficial",
        buy: 783.5,
        sell: 823.5,
        cod: "USD",
    },
    {
        id: 2,
        name: "Dolar Blue",
        buy: 965,
        sell: 995,
        cod: "USD",
    },
    {
        id: 3,
        name: "Dolar Bolsa",
        buy: 944.15,
        sell: 947.17,
        cod: "USD",
    },
    {
        id: 4,
        name: "Euro",
        buy: 879.17,
        sell: 879.3,
        cod: "EUR",
    },
    {
        id: 5,
        name: "Libra Esterlina",
        buy: 1014,
        sell: 1020,
        cod: "GBP",
    },
    {
        id: 6,
        name: "Peso Uruguayo",
        buy: 13.39,
        sell: 24.28,
        cod: "UYU",
    },
    {
        id: 7,
        name: "Real",
        buy: 163.43,
        sell: 163.47,
        cod: "BRL",
    },
];

let myAmount = 0;
let myWallet = [];

op = parseInt(
    prompt(
        "Elija una opción: \n1: Ingresar Monto\n2: Mostrar divisas por consola \n3: Calcular compra \n4: Filtrar por precio \n5: Filtrar por nombre \n6: Salir"
    )
);

while (op !== 6) {
    switch (op) {
        case 1:

            myAmount = amount(myAmount);
            break;

        case 2:

            currency.forEach((currency) => {
                console.log(`Divisa: ${currency.name} (${currency.cod}) , Precio Compra: ${currency.buy} , Precio Venta: ${currency.sell} `);
            });
            break;
        case 3:

            validAmount(myAmount, myWallet, currency);
            break;
        case 4:

            filterPrice(currency);
            break;
        case 5:

            filterName(currency);
            break;
        default:
            alert("Opción Incorrecta");
            break;
    }
    op = parseInt(
        prompt(
            "Elija una opción: \n1: Ingresar Monto \n2: Mostrar divisas por consola \n3: Calcular compra \n4: Filtrar por precio \n5: Filtrar por nombre \n6: Salir"
        )
    );
}

alert("Finalizado su programa, enter para cerrar");
