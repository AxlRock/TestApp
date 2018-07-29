var Main = 
{
  Devices:
  { 
    Mac:null,
    Name:null,
    str:''
  },
  ConnectedList:function(item)
  {
    try
    {
      if (Main.Devices.Mac == null)
        throw 'Seleccione un dispositivo para poder continuar';

      var items = ['btnConnected', 'btnListar'];
    	var fail = function(e){ Tools.Notification(e, null); Tools.Progress('progress','none'); Tools.DisabledItems(items, false); };
    	
      var sc = function(s)
      {
        Tools.DisabledItems(items, false); 
        Tools.setFrame("minitor", '#_mMonitor');
        Tools.Progress('progress','none'); 
        Main.Subscribe('#txtMonitor'); 

        setTimeout(function()
        {
          Main.Devices.str = '<label>CONECTADO CORRECTAMENTE</label><br>';
          $('#txtMonitor').html(Main.Devices.str);
        },1000);
      };

      Tools.Progress('progress','block');
      Tools.DisabledItems(items, true);

    	bluetoothSerial.connect(this.Devices.Mac, sc, fail);
    }
    catch(ex)
    {
      Tools.Notification(ex, null);
    }
  },
  sendData: function() 
  {
    try
    {
      var data = $('#txtSendData').val(), items = ['btnsend', 'txtSendData'];
      
      if(data.length == 0)
        throw 'ingrese un dato para poder continuar.';

      var fail = function(e){ Tools.Notification(e, null); Tools.Progress('progress','none'); Tools.DisabledItems(items, false); };
      var sc = function(s)
      {
        Tools.Progress('progress','none'); 
        Tools.DisabledItems(items, false); 
        Main.Devices.str = Main.Devices.str + '<label style="float: right;">'+ data.toUpperCase() +'</label><br>'; 
        $('#txtMonitor').html(Main.Devices.str);
        $('#txtSendData').val('');
      };

      Tools.Progress('progress','block');
      bluetoothSerial.write(data, sc, fail);
    }
    catch(ex)
    {
      Tools.Notification(ex, null);
    }
  },
  Subscribe:function(item)
  {
    var id = item;
    var fail = function(e){ Tools.Notification(e, null); Tools.Progress('progress','none'); };
    var sc = function(s)
    {
      Main.Devices.str = Main.Devices.str + '<label style="float:left">' + s +'</label><br>';
      $(id).val(Main.Devices.str);
    };
    bluetoothSerial.subscribe("\n", sc, fail);
  },
  List:function()
  {
  	/*" id: " + item.id + " Address: " + item.address;*/
    var fail = function(e){ Tools.Notification(e, null); Tools.Progress('progress','none');}
    var sc = function(s)
    { 
      var str='<ul class="collection with-header" id="vdListDevices">', active, name;
      str = str + '<li class="collection-header"><h4>Devices<h4></li>'
      s.forEach(function(item, index)
      { 
        if (index == 0)
         Main.Devices = {Mac: item.address, Name: item.name};

          name = item.name == undefined ? 'Dispositivo Desconocido' : item.name;
      	  active = index == 0 ? 'collection-item active' : 'collection-item';

          str = str + '<li class="'+ active +'" onclick="Tools.sltListDevices('+index+', \''+  item.address +'\', \''+ name +'\')" id="aListDevices'+index+'">' + name + '</li>';
      });
      str = str + '</ul>';
      $("#scMain").html(str);
      document.getElementById('btnConnected').disabled = false;
      Tools.Progress('progress','none');
    };

    Tools.Progress('progress','block');
    bluetoothSerial.list(sc, fail);
  },
  btStatus:function()
  {
  	var fail = function(e){ Tools.Notification(e, null);}
  	var sc = function(s){ Main.List(); }
  	bluetoothSerial.isEnabled(sc, fail);
  }
}