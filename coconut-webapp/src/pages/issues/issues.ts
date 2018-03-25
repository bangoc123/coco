import { SuggestActionPage } from './../suggest-action/suggest-action';
import { LoginPage } from './../login/login';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, IonicPage, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import leaflet from 'leaflet';
import 'leaflet-draw';
/**
 * Generated class for the IssuesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'issues/'
})
@Component({
  selector: 'page-issues',
  templateUrl: 'issues.html',
})
export class IssuesPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  listStuff = "issues";
  issueList: Array<any>;
  actionList: Array<any>;
  actionPoints: Array<any> = [];
  actionArea: any;
  enableSummitAction: boolean = false;
  login: boolean = false;
  currentLayer: any = "";
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public http: Http, public events: Events) {
    events.subscribe('user:logined', (token) => {
      this.login = true
    });
    events.subscribe('user:logout', (token) => {
      this.login = false
    });
    this.getStuff()
  }

  getStuff() {
    this.http.get('https://8bebd614.ngrok.io/issues').map(res => res.json()).subscribe(data => {
      data.data.forEach(issue => {
        if (typeof (issue.content) == "undefined") {
          issue.content = { smelling: "", color: "" }
        }
      });
      setTimeout(() => {
        this.issueList = data.data;
        console.log(this.issueList)
        this.addMarker()
      }, 600);
    });
    this.http.get('https://8bebd614.ngrok.io/actions').map(res => res.json()).subscribe(data => {
      this.actionList = data.data;
      console.log(this.actionList)
    });
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.loadmap();
    }, 200);
  }

  loadmap() {
    this.map = leaflet.map("map", { drawControl: true });
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 1
    }).addTo(this.map);
    this.map.setView([10.7662421, 106.6708211], 14)

    var editableLayers = new leaflet.FeatureGroup();
    this.map.addLayer(editableLayers);

    var drawPluginOptions = {
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
          },
          shapeOptions: {
            color: '#4DD65A'
          }
        },
        // disable toolbar item by setting it to false
        polyline: false,
        circle: true, // Turns off this drawing tool
        rectangle: true,
        marker: true,
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: true
      }
    };

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new leaflet.Control.Draw(drawPluginOptions);
    this.map.addControl(drawControl);


    this.map.on('draw:created', (e) => {
      var type = e.layerType,
        layer = e.layer;

      if (type === 'marker') {
        layer.bindPopup('A popup!');
      }
      console.log(e)
      this.actionArea = e.layer
      this.enableSummitAction = true
      this.actionPoints = e.layer._latlngs[0]
      editableLayers.addLayer(layer);
    });


  }
  addpolygon(latlngs) {
    if (this.currentLayer != "") {
      this.map.removeLayer(this.currentLayer)
      this.currentLayer = ""
    }
    // latlngs = [[37, -109.05], [41, -109.03], [41, -102.05], [37, -102.04]];
    console.log(latlngs)
    var polygon = leaflet.polygon(latlngs, { color: 'red' }).addTo(this.map);
    // zoom the map to the polygon
    this.currentLayer = polygon
    console.log(polygon)
    this.map.flyToBounds(polygon.getBounds());
  }
  addMarker() {
    var i = 0
    this.issueList.forEach(issue => {
      i++
      setTimeout(() => {
        leaflet.marker([issue.lat, issue.lng]).addTo(this.map);
      }, 200 * i);
    });
  }
  flyToIssue(issue) {
    if (this.currentLayer != "") {
      this.map.removeLayer(this.currentLayer)
      this.currentLayer = ""
    }
    this.map.flyTo([issue.lat, issue.lng], 18)
  }
  viewImage(image) {
    let modal = this.modalCtrl.create("ImageViewPage", { image: image });
    modal.present();
  }

  openLogin() {
    let modal = this.modalCtrl.create("LoginPage");
    modal.present();
  }
  openSuggestIssue() {
    let modal = this.modalCtrl.create("SuggestActionPage", { data: this.actionPoints });
    modal.present();
    modal.onDidDismiss(() => {
      this.enableSummitAction = false
      this.map.removeLayer(this.actionArea)
      this.getStuff()
    })
  }
}
