# leaflet & postgis & node.js & express & react.js

## technologies
<ul>
  <li>the site uses leaflet to display geographical data </li>
  <li>postgis to save spatial data</li> 
  <li>react for dispalying </li>
  <li>express js for backend</li>
  <li>redux for state managment</li>
</ul>

## data

The data in the database: 
<ul>
  <li>countires: world countries</li>
  <li>cities: world cities with over 200,000 population</li>
  <li>user data: data availble for the user to create, edit, delete, and download</li>
</ul>

### note_1:
The user's data are created are not saved for more than 24 hours on the database
the data are controlled by triggers on the databases that clean the database. 

### note_2:
the data should not be allowed to be saved by all users.
there should be some kind of authorization or saving on localhost, but this is only a showcase for the using leaflet to save on database.
