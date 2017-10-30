
var map = new L.Map('map',{ zoomControl:false });
 map.attributionControl.setPrefix('');

map.on('click', function(e) {        
        var popLocation= e.latlng;
        var popup = L.popup()
        .setLatLng(popLocation)
        .setContent("Set Alarm here! <input type=hidden id=value1 value="+e.latlng.lat+" /><input type=hidden id=value2 value="+e.latlng.lng+" /><center><img src=./css/images/bell.png onClick=add_reminder(); /></center>")
        .openOn(map);        
    });

L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = './css/images/logo.png';
        img.style.width = '50px';

        return img;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});


L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'bottomleft' }).addTo(map);

    map.setView([9.59262549583373, 79.4036865234375], 7, false);

    L.tileLayer.grayscale('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            noWrap: true,
            attribution: 'Developer <a href="https://github.com/vignesan">Vignesan</a> | Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> '
        }).addTo(map);  
    

    var current_position, current_accuracy, date,date1,date3,date4,marker,lat2,lon2,R,dLat,dLon,a,c,d,z;
            function onLocationFound(e) {
            if (current_position) {
                map.removeLayer(current_position);
                map.removeLayer(current_accuracy);
            }
            var radius = e.accuracy / 8;
            var lat=e.latlng.lat;
            var lng=e.latlng.lng;
            
            current_position = L.marker(e.latlng).bindPopup("<b>Your Position</b>").addTo(map);
            current_accuracy = L.circle(e.latlng, radius).addTo(map);
            store();
         lat2=date3;
         lon2=date4;
         R = 6378.137; 
         dLat = lat2 * Math.PI / 180 - lat * Math.PI / 180;
         dLon = lon2 * Math.PI / 180 - lng * Math.PI / 180;
         a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
         c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
         d = R * c;
         z = d * 1;
        

            if (z<=1){

                 document.getElementById('siren').play();

            sweetAlert({
                title: "STOP",
                text: "IMMEDIATELY",
                imageUrl: "./css/images/stop.png",
                // timer: 21000,
                showConfirmButton: true,
            });

}
    //map.setView(e.latlng, map.getZoom(), { animation: true });

}

    
        function onLocationError(e) {
            alert(e.message);
        }
        
        map.on('locationfound', onLocationFound);
        //map.on('locationerror', onLocationError); 
        L.easyButton('<img src="./css/images/locate.png">', function(btn, map) {

                               
            map.locate({
                
                watch: true,
                dragging: true,
                enableHighAccuracy: true,
                timeout: 1000*60,                
                maximumAge: 60000*60*60*60,
                frequency: 1,
            });
                        

        }).addTo(map);
