const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Pruebas de inicio de sesión y agregar nueva obra', function() {
  this.timeout(60000); // Aumenta el tiempo de espera a 60 segundos

  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('debería iniciar sesión correctamente', async function() {
    await driver.get('http://localhost:3000/login');

    // Espera a que se cargue el formulario de inicio de sesión
    await driver.wait(until.elementLocated(By.css('.login')), 20000);

    // Encuentra los campos de nombre de usuario, contraseña y el botón de inicio de sesión
    let usernameField = await driver.findElement(By.css('.login input[type="text"]'));
    let passwordField = await driver.findElement(By.css('.login input[type="password"]'));
    let loginButton = await driver.findElement(By.css('.login button[type="submit"]'));

    // Ingresa el nombre de usuario y la contraseña
    await usernameField.sendKeys('Tester');
    await passwordField.sendKeys('user_no_tes');

    // Envía el formulario haciendo clic en el botón de inicio de sesión
    await loginButton.click();

    // Espera a que la página se redireccione después del inicio de sesión
    await driver.wait(until.urlContains('/profile'), 20000);

    // Verifica si la página de dashboard está cargada después del inicio de sesión
    assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3000/profile');
  });

  it('debería agregar una nueva obra correctamente', async function() {
    // Navega a la página de agregar obra
    await driver.get('http://localhost:3000/crear_obras');

    // Espera a que se cargue el formulario de agregar obra
    await driver.wait(until.elementLocated(By.css('form')), 20000);

    // Encuentra y rellena los campos del formulario de agregar obra
    let descripcionField = await driver.findElement(By.id('descripcion'));
    let usuarioCapatazField = await driver.findElement(By.id('usuario_capataz'));
    let proveedoresField = await driver.findElement(By.id('proveedores'));
    let paisField = await driver.findElement(By.id('pais'));
    let nitField = await driver.findElement(By.id('nit'));
    let nitNumberField = await driver.findElement(By.id('nit_number'));
    let mesInicioField = await driver.findElement(By.id('mes_inicio'));
    let tipoPagoField = await driver.findElement(By.id('tipo_pago'));
    let direccionField = await driver.findElement(By.id('direccion'));
    let telefonoField = await driver.findElement(By.id('telefono'));
    let crearButton = await driver.findElement(By.css('button[type="button"]'));
     // Cambia el selector según el tipo de botón que sea

    // Rellena los campos del formulario
    await descripcionField.sendKeys('Nueva Obra');
    await usuarioCapatazField.sendKeys('Usuario Capataz');
    await proveedoresField.sendKeys('Proveedor 1');
    await paisField.sendKeys('País');
    await nitField.sendKeys('NIT');
    await nitNumberField.sendKeys('123456789');
    await mesInicioField.sendKeys('Ene');
    await tipoPagoField.sendKeys('Contado');
    await direccionField.sendKeys('Nueva Dirección');
    await telefonoField.sendKeys('987654321');

    // Envía el formulario haciendo clic en el botón de enviar
    await crearButton.click();

    // Espera la respuesta del servidor o la redirección después de la creación de la obra
    await driver.wait(until.urlContains('/profile'), 20000);

    // Verifica si la página se ha redirigido correctamente después de crear la obra
    assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3000/profile');
  });
});
