import './App.css';
import { useState } from "react";
import playerData from "./assets/player-data.json";

playerData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function PlayerCard(player, inRoster, addPlayerToRoster, removePlayerFromRoster) {
  return ( 
    <div class="PlayerCard">
      <img src={player.image} alt={player.name}></img>
      <h2>{player.name}</h2>
      <p>{player.team} • {player.position}</p>
    
      <div class="StatsDisplay">
        <div>
          <p>Points</p>
          <h1>{player.ppg}</h1>
        </div>
        <div>
          <p>Rebounds</p>
          <h1>{player.rpg}</h1>
        </div>
        <div>
          <p>Assists</p>
          <h1>{player.apg}</h1>
        </div>
      </div>

      <button onClick={() => (inRoster? removePlayerFromRoster(player.name, player.ppg) : addPlayerToRoster(player.name, player.ppg))}>{(inRoster? "Remove From Roster" : "Add to Roster")}</button>
    </div>
  );
}

function App() {
  const [teamFilter, setTeamFilter] = useState("All");
  const [positionFilter, setPositionFilter] = useState("All");
  const [sortType, setSortType] = useState("None")
  const [totalPPG, setTotalPPG] = useState(0);
  const [numPlayers, setNumPlayers] = useState(0);
  const [rosterPlayers, setRosterPlayers] = useState([]);

  const addPlayerToRoster = (name, ppg) => {      
    setRosterPlayers(rosterPlayers => [...rosterPlayers, name])
    setTotalPPG(totalPPG + ppg)
    setNumPlayers(numPlayers + 1)
  }

  const removePlayerFromRoster = (name, ppg) => {
    var players = [...rosterPlayers]
    const index = players.indexOf(name);
    if (index > -1) { // only splice array when item is found
      players.splice(index, 1); // 2nd parameter means remove one item only
    }
    setRosterPlayers(players)
    setTotalPPG(totalPPG - ppg)
    setNumPlayers(numPlayers - 1)
  }

  const matchesFilterType = player => {
    // all items should be shown when no filter is selected
    if(teamFilter === "All" && positionFilter === "All") { 
      return true
    } else if (teamFilter !== "All" && positionFilter !== "All") {
      return teamFilter === player.team && positionFilter === player.position
    } else if (teamFilter !== "All" && positionFilter === "All") {
      return teamFilter === player.team
    } else {
      return positionFilter === player.position
    }
  }

  const sortFunction = (a, b) => {
    if (sortType == "None") {
      return 0
    } else if (sortType == "ppg") {
      return b.ppg - a.ppg
    } else if (sortType == "rpg") {
      return b.rpg - a.rpg
    } else {
      return b.apg - a.apg
    }
  }
  
  const filteredData = playerData.filter(matchesFilterType)
  filteredData.sort(sortFunction);
 
  return (
    <div className="App">
     
      <div class="MainGrid">
        <div class="Roster">
            <h2>Filter Players:</h2>
            <label>Position:</label>
            <select onChange={e => setPositionFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Small Forward">Small Forward</option>
              <option value="Power Forward">Power Forward</option>
              <option value="Shooting Guard">Shooting Guard</option>
              <option value="Point Guard">Point Guard</option>
              <option value="Center">Center</option>
            </select>
            <label>Team:</label>
            <select name="team" onChange={e => setTeamFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Boston Celtics">Boston Celtics</option>
              <option value="Los Angeles Lakers">Los Angeles Lakers</option>
              <option value="Brooklyn Nets">Brooklyn Nets</option>
              <option value="Phiadelphia 76ers">Philadelphia 76ers</option>
            </select>
            <h2>Sort Players:</h2>
            <div>
              <input type="radio" name="sort" value="None" id="none" onChange={e => setSortType(e.target.value)}/> 
              <label for="none">None</label>
            </div>
            <div>
              <input type="radio" name="sort" value="ppg" id="points" onChange={e => setSortType(e.target.value)}/> 
              <label for="points">Points</label>
            </div>
            <div>
              <input type="radio" name="sort" value="rpg" id="rebounds" onChange={e => setSortType(e.target.value)}/> 
              <label for="rebounds">Rebounds</label>
            </div>
            <div>
              <input type="radio" name="sort" value="apg" id="assists" onChange={e => setSortType(e.target.value)}/> 
              <label for="assists">Assists</label>
            </div>
    
            <h2>Your Current Roster:</h2>
            {[...rosterPlayers].map((name) => (
              <p>{name}</p>
            ))}
            <h3>Average ppg: {numPlayers > 0 ? (totalPPG / numPlayers).toFixed(2) : 0.0}</h3>
        </div>
        <div class="gallery-container">
            {filteredData.map((player, index) => ( // TODO: map bakeryData to BakeryItem components
              PlayerCard(player, rosterPlayers.includes(player.name), addPlayerToRoster, removePlayerFromRoster) // replace with BakeryItem component
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
