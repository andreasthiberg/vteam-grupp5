PopUp not working
      {scootersInfo && (
        <Popup
          position={scooter.pos}
          onClose={() => {
            setScootersInfo();
          }}
        >
          <div>
            <p>{scooter.id}</p>
            <p>{scooter.status}</p>
            <p>{scooter.battery}</p>
          </div>
        </Popup>
      )}

import { Popup } from "react-leaflet";
      importera 