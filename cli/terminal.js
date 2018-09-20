const blessed  = require('blessed');

function Terminal(paradise)
{
  this.paradise = paradise;
  
  this._screen = blessed.screen();
  this._body = blessed.box({ top: 2, left: 5, height: '100%-4', width: '100%-10', keys: true, mouse: true });
  this._icon = blessed.box({ bottom: 2, left: 4, height: 1, width: 1, style: { fg: '#fff' } });
  this._input = blessed.textbox({ bottom: 2, left: 6, height: 1, width: '100%-12', keys: true, mouse: true, inputOnFocus: true, style: { fg: '#fff' }});
  this._status = blessed.box({ bottom: 1, left: 4, height: 1, width: '100%-10', style: { fg: '#000', bg: '#fff' }});

  this.install = function()
  {
    this._screen.append(this._body);
    this._screen.append(this._input);
    this._screen.append(this._icon);
    this._screen.append(this._status);
  }

  this.start = function()
  {
    this._screen.key(['escape', 'q', 'C-c'], (ch, key) => (process.exit(0)));

    this._input.on('submit', (text)=>{ this.on_submit(text) });
    this._input.on('keypress', (text)=>{ this.on_keypress(text) });
    this._input.focus();
    this.query();
  }

  this.update = function()
  {
    this._screen.render();
  }

  this.query = function(input = "")
  {
    let response = this.paradise.query(0,input)
    this._body.setContent(response.sight.cli);
    this._status.setContent(response.sight.passive)
    this._screen.render();
  }

  this.on_submit = function(text)
  {
    this.query(text);
    this._icon.setContent(":");
    this._input.clearValue();
    this._input.focus();
    this.update();
  }

  this.on_keypress = function(text)
  {
    this._icon.setContent(text.trim() == "" ? ":" : ">");
    this.update();
  }
}

module.exports = Terminal
