var Tools = 
{
  setFrame:function(file, item)
  {
	$('.sidenav').sidenav('close');

   	var url = "includes/"+file+".html";
	$('#includedContent').load(url);

	$("#mobile-demo li a").each(function(){
  		this.style.backgroundColor = "#fff";
  		this.style.color = "rgba(0,0,0,0.87)";
  	}); 
  	$(item).css({"background-color":"#26a69a", "color":"#fff"});
  },
  Progress:function(id, view)
  {
  	document.getElementById(id).style.display = view;
  },
  Notification:function(msg, sc)
  {
  	navigator.notification.alert(msg, sc, 'Bluetooth Connect', 'Aceptar');
  	navigator.vibrate(1000);
	  navigator.notification.beep(1);
  },
  sltListDevices:function(id, address, name)
  {
  	$("#vdListDevices li").each(function(){
  		this.style.backgroundColor = "#fff";
  		this.style.color = "rgba(0,0,0,0.87)";
  	}); 

  	var item = "#aListDevices"+id;
  	$(item).css({"background-color":"#26a69a", "color":"#fff"});
  	Main.Devices.Mac = address;
  	Main.Devices.Name = name;
  },
  DisabledItems:function(id,status)
  {
    try
    {
      var ar = id;
      var name;
      for(var i = 0;i<ar.length;i++)
      {
        name = ar[i];
        document.getElementById(name).disabled = status;
      }
    }
    catch(e){ console.log(e); }
  }
};
