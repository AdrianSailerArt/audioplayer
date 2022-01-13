const template = [
  {
    label: "Menupunkt",
    submenu: [
      {
        label: "info1",
        click: function () {
          console.log("Hallo Klick");
        },
      },
      {
        label: "Doku",
        click() {
          shell.openExternal("https://www.electronjs.org/docs");
        },
      },
      { type: "separator" },
      {
        label: "Ende",
        click() {
          app.quit();
        },
      },
    ],
  },

  {
    label: "Bearbeiten",
    submenu: [{ role: "selectAll", label: "Alles auswählen" }],
  },
];
module.exports = { template };
