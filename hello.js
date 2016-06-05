/*jshint esversion: 6 */


import React from "react";

export default React.createClass({

 render: function() {
   return (
     <div>
         Hello, {this.props.name}!
     </div>
   );
 },
});