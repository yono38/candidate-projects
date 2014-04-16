var IntentMedia = IntentMedia || {};

IntentMedia.Distance = (function () {
    var pub = {};
    var airport_grid = airport_grid || get_airport_grid();

    pub.airport_exists = function (airport_code) {
      return airport_grid.hasOwnProperty(airport_code);
    };

    pub.distance_between_airports = function (from_airport, to_airport) {
      if (pub.airport_exists(from_airport) && pub.airport_exists(to_airport)) {
        return airport_grid[from_airport][to_airport];
      }

      return 0;
    };

    function get_airport_grid() {
      return {
        JFK: {LAX: 2475, LAS: 2248, PDX: 2454},
        LAX: {JFK: 2475, LAS: 236, PDX: 834},
        LAS: {JFK: 2248, LAX: 236, PDX: 763},
        PDX: {JFK: 2454, LAS: 763, LAX: 834}
      }
    };

    return pub;
}(IntentMedia || {}));
