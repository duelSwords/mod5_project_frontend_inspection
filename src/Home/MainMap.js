import React from 'react'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { connect } from 'react-redux'
import MapInspection from './MapInspection'



class MainMap extends React.Component{



    render() {
        
        let component = this.props.inspectionArray
        if(component !== undefined) {
            component = component.map(inspectionObj => {
               return <MapInspection id={inspectionObj.id} 
                        inspection={inspectionObj} 
                        selectDate={this.props.selectDate}
                        />
             })
         } 

         const Map = ReactMapboxGl({
            accessToken: process.env.REACT_APP_MAPBOX_API_KEY
        });

       
        //Must be in longitude, latitude coordinate order   
      
        return (
            <div >
               
                <Map
                    className="main-map"
                    style="mapbox://styles/mapbox/streets-v9"
                    center={ [-73.985130, 40.758896] }
                    zoom={[12]}
                    containerStyle={{
                        height: '70vh',
                        width: '70vw',
                    }}
                >
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={[-73.985130, 40.758896]} />
                        <Feature coordinates={[-74.004821, 40.742051]} />
                    </Layer>

                    <Marker
                    coordinates={[-73.985130, 40.758896]}
                    anchor="bottom">
                    <button>
                        <img src="https://res.cloudinary.com/dfqzcsl8x/image/upload/v1602968347/Project4/Umaru_Doma_jktg1r.jpg" width="20" height="30"/>
                    </button>
                    </Marker>

             
                    {component}
                </Map>
               
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    console.log(state)
    return {
        inspectionArray: state.userRR.user.inspections,
        token: state.userRR.token
    }
 }
 

export default connect(mapStateToProps)(MainMap)

