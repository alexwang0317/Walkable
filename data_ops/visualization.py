import folium
from folium.plugins import HeatMap
import pandas as pd
import numpy as np

def create_heatmap(df, lat_column, lon_column, center_lat=None, center_lon=None, zoom_start=11):
    # If center coordinates are not provided, use the mean of the data
    if center_lat is None or center_lon is None:
        center_lat = df[lat_column].mean()
        center_lon = df[lon_column].mean()
    
    # Create a map
    m = folium.Map(location=[center_lat, center_lon], zoom_start=zoom_start)
    
    # Prepare the data for the heatmap
    heat_data = df[[lat_column, lon_column]].values.tolist()
    
    # Add the heatmap to the map
    HeatMap(heat_data).add_to(m)
    
    # Save the map
    m.save("heatmap.html")

# Example usage
if __name__ == "__main__":
    # Create a sample DataFrame (replace this with your actual data loading)
    np.random.seed(42)
    n = 1000
    df = pd.DataFrame({
        'latitude': np.random.uniform(40.6, 40.8, n),
        'longitude': np.random.uniform(-74.1, -73.9, n),
        'value': np.random.rand(n)  # Example of an additional column
    })
    
    # Create and save the heatmap
    create_heatmap(df, 'latitude', 'longitude')
    
    print("Heatmap has been created and saved as 'heatmap.html'")