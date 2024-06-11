const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Pruebas de inicio de sesión y agregar nueva tarea', function() {
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

  it('debería agregar una nueva tarea correctamente', async function() {
    // Navega a la página de agregar obra
    await driver.get('http://localhost:3000/crear_obras');

    // Espera a que se cargue el formulario de agregar obra
    await driver.wait(until.elementLocated(By.css('form')), 20000);

    // Encuentra y presiona el botón de crear tarea
    let crearTareaButton = await driver.findElement(By.xpath('//button[contains(text(), "Crear Tareas")]'));
    await crearTareaButton.click();

    // Espera a que se cargue el formulario de agregar tarea
    await driver.wait(until.elementLocated(By.css('form')), 20000);

    // Encuentra y rellena los campos del formulario de agregar tarea
    let descripcionField = await driver.findElement(By.id('descripcion'));
    let crearButton = await driver.findElement(By.css('button[type="button"]'));

    // Rellena los campos del formulario
    await descripcionField.sendKeys('Nueva Tarea');

    // Envía el formulario haciendo clic en el botón de enviar
    await crearButton.click();

    // Espera la respuesta del servidor o la redirección después de la creación de la tarea
    await driver.wait(until.urlContains('/profile'), 20000);

    // Verifica si la página se ha redirigido correctamente después de crear la tarea
    assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3000/profile');
  });
});
