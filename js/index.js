var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) 
    {
      try
      {
        console.log('--> Dispositivo listo: ' + id);
      }
      catch(ex)
      {
        console.log('--> Error: ' + ex.message+' <--');
      }
    }
};

app.initialize();