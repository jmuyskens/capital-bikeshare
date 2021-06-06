# capital-bikeshare

Trying out GitHub OCTO's [Flat Data](https://octo.github.com/projects/flat-data) with the [Capital Bikeshare](https://www.capitalbikeshare.com/system-data) station data set. 

This grabs [station_information.json](https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json) once a day and converts it into pretty-printed JSON, GeoJSON and CSV. In theory, this will allow us to see any changes as stations are added, moved or removed from the system in the commit history of this repository, following [Simon Willison's git scraping technique](https://simonwillison.net/2020/Oct/9/git-scraping/).

The files `station_information.*` are generated, please do not modify them.

## See also:

- [All JSON files published by Capital Bikeshare](https://gbfs.capitalbikeshare.com/gbfs/gbfs.json)
- [Open Data DC : Capital Bike Share Locations](https://opendata.dc.gov/datasets/DCGIS::capital-bike-share-locations/about)