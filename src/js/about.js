import './general';
export function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 59.325, lng: 18.070}
        });
        const marker = new google.maps.Marker({
        map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat:  9.033687, lng: 38.763944}
        });
        marker.addListener('click', () => {
        infowindow.open(map,marker);
        });
        const infowindow = new google.maps.InfoWindow({
        content: `<h3> Event Location</h3><p>@Arat kilo</p>`
        });
        infowindow.open(map,marker);

} 
window.addEventListener("load", () => {
const $script = document.createElement('script');
$script.src = `https://maps.googleapis.com/maps/api/js?
key=${GMAP_KEY}&callback=bundle.initMap`;
document.querySelector('body').appendChild($script);
});