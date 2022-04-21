import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const UserPlaces = (props) => {
    const params = useParams();

    const DUMMY_PLACES = [
        {
            id:'p1', 
            title:'Empire State Building', 
            description:'One of the most famous sky scrapers in the world!', 
            imageUrl:'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            address:'New York, 10001, United States of America',
            location:{
                lat: 40.7485492,
                long: -73.9879522
            },
            creator: 'u1'
        },
        {
            id:'p2', 
            title:'Empire State Building', 
            description:'One of the most famous sky scrapers in the world!', 
            imageUrl:'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            address:'New York, 10001, United States of America',
            location:{
                lat: 40.7485492,
                long: -73.9879522
            },
            creator: 'u2'
        }
    ]

    return (
        <PlaceList items={DUMMY_PLACES.filter(place => place.creator===params.userId)} />
    )
}

export default UserPlaces;