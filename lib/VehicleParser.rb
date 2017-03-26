module VehicleParser
  def distanceCalculator(results) 
    length = @vehicles.length-1
    length.times do |i|
      k1 = @vehicles[i]
      k2 = @vehicles[i+1]
      dist = GeoDistance::Haversine.geo_distance(@lat[i], @lon[i], @lat[i+1], @lon[i+1])
      d = dist.miles.to_s.scan(/[0-9 "."]/).join[0, 4]
      results[[k1, k2]] = d
    end
  end
 
  def distanceMaker(results)
    @info = results
    @distances = []
    results.each do |k, v|
      bus1 = k[0].to_s
      bus2 = k[1].to_s
      dist = v.to_s
      @distances.push(bus1 + " and " + bus2 + " are " + dist + " miles apart")  
    end 
    return @distances
  end

  def getLon2
    @lon = @results.xpath('//lon')
  end 
  def getLon
    @lon = @results.xpath('//lon')
    lonarr = []
    @lon.each do |lon| 
      lonarr.push(lon.inner_text.to_f)
    end
    @lon = lonarr
  end

  def getLat
    @lat = @results.xpath('//lat')
    latarr = [] 
    @lat.each do |lat| 
      latarr.push(lat.inner_text.to_f)
    end
    @lat = latarr
  end

  def getVehicles   
    @vehicles = @results.xpath('//vid')
    vidarr = []
    @vehicles.each do |vehicle| 
      vidarr.push(vehicle.inner_text.to_i)
    end
    @vehicles = vidarr
  end

  def vehicleFilter
    request() if !self.results
    getLon()
    getLat()
    getVehicles()
    dest = @results.xpath('//des')
    @arr = Array.new(dest.length)
    dest.each_with_index do |dest, i|
      if dest.to_s.include?(@destination)
        @arr[i] = true
      end
    end
    @arr.each_with_index do |val, i|
      if @arr[i]!=true
        @vehicles[i]= nil
        @lon[i]=nil
        @lat[i]=nil
      end 
    end
    @vehicles.delete(nil)
    @lon.delete(nil)
    @lat.delete(nil)
  end 
end
