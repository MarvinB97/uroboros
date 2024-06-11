const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Pruebas de inicio de sesión y agregar nuevo usuario', function() {
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

  it('debería agregar un nuevo usuario correctamente', async function() {
    // Navega a la página de agregar usuario
    await driver.get('http://localhost:3000/signin');

    // Espera a que se cargue el formulario de agregar usuario
    await driver.wait(until.elementLocated(By.css('form')), 20000);

    // Encuentra y rellena los campos del formulario de agregar usuario
    let usernameField = await driver.findElement(By.id('ejemploUsuario'));
    let passwordField = await driver.findElement(By.id('ejemploContrasena'));
    let firstNameField = await driver.findElement(By.id('ejemploNombre'));
    let lastNameField = await driver.findElement(By.id('ejemploApellidos'));
    let tipoIdentificacionField = await driver.findElement(By.id('ejemploSelectId'));
    let identificacionField = await driver.findElement(By.id('ejemploId'));
    let generoField = await driver.findElement(By.id('ejemploSelectGener'));
    let cargoField = await driver.findElement(By.id('ejemploSelectRol'));
    let direccionField = await driver.findElement(By.id('exampleAddress'));
    let telefonoField = await driver.findElement(By.id('ejemploTelefono'));
    let emailField = await driver.findElement(By.id('ejemploEmail'));
    let checkField = await driver.findElement(By.id('exampleCheck'));
    let submitButton = await driver.findElement(By.css('button[type="button"]'));

    // Rellena los campos del formulario
    await usernameField.sendKeys('NuevoUsuario');
    await passwordField.sendKeys('NuevaContrasena');
    await firstNameField.sendKeys('NuevoNombre');
    await lastNameField.sendKeys('NuevoApellido');
    await tipoIdentificacionField.sendKeys('CC'); // Selecciona el tipo de identificación
    await identificacionField.sendKeys('123456789');
    await generoField.sendKeys('M'); // Selecciona el género
    await cargoField.sendKeys('Administrador'); // Selecciona el rol
    await direccionField.sendKeys('Nueva Dirección');
    await telefonoField.sendKeys('987654321');
    await emailField.sendKeys('nuevoemail@example.com');
    await checkField.click(); // Marca el checkbox de autorización
    // Marca el checkbox de autorización
    await checkField.click();

    // Envía el formulario haciendo clic en el botón de enviar
    await submitButton.click();

    // Espera la respuesta del servidor o la redirección después de la creación del usuario
    await driver.wait(until.urlContains('/profile'), 20000);
 
    // Verifica si la página se ha redirigido correctamente después de crear el usuario
    assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3000/profile');
  });
});
