import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = () => (
  <div>
   
      <Dimmer active >
        <Loader inverted>signin</Loader>
      </Dimmer>
   
  </div>
);

export default Loading;
