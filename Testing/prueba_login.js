const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Prueba de inicio de sesión y carga de la segunda columna del login', function() {
  this.timeout(30000); // Aumenta el tiempo de espera a 30 segundos

  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('debería cargar la segunda columna del login correctamente', async function() {
    await driver.get('http://localhost:3000/login');

    // Espera a que se cargue la segunda columna del login
    await driver.wait(until.elementLocated(By.css('.content-ColumnTwo')), 20000);

    // Verifica si la segunda columna del login está presente
    let columnTwo = await driver.findElement(By.css('.content-ColumnTwo'));
    assert.strictEqual(await columnTwo.isDisplayed(), true, 'La segunda columna del login no se muestra correctamente');

    // Verifica si el logo está presente y tiene la clase adecuada
    let logo = await driver.findElement(By.css('.content-ColumnTwo .App-logo'));
    assert.strictEqual(await logo.isDisplayed(), true, 'El logo no se muestra correctamente');
    assert.strictEqual(await logo.getAttribute('alt'), 'logo', 'El atributo "alt" del logo no es correcto');

    // Verifica si el título está presente y tiene el texto adecuado
    let title = await driver.findElement(By.css('.content-ColumnTwo .title'));
    assert.strictEqual(await title.isDisplayed(), true, 'El título no se muestra correctamente');
    assert.strictEqual(await title.getText(), 'Constructora Uroboros', 'El texto del título no es correcto');

    // Verifica si el párrafo está presente y tiene el texto adecuado
    let paragraph = await driver.findElement(By.css('.content-ColumnTwo p'));
    assert.strictEqual(await paragraph.isDisplayed(), true, 'El párrafo no se muestra correctamente');
    assert.strictEqual(await paragraph.getText(), 'Somos una compañia dedicada a cumplir tu sueño de tener una casa propia.',
     'El texto del párrafo no es correcto');
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
    await driver.wait(until.urlContains('/profile'), 10000);

    // Verifica si la página de dashboard está cargada después del inicio de sesión
    assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3000/profile');
  });
});

