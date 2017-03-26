require_relative './key'
module ApiKey
  def nokoRouteRequest
    raise ArgumentError, "@route is nil" if @route.nil?
    Nokogiri::XML(open(routeBaseUrl+key+'&rt='+@route.to_s))
  end 
  
  def routeBaseUrl 
    'http://www.ctabustracker.com/bustime/api/v1/getvehicles?key='
  end 
  def nokoPredictionRequest(index)
    raise ArgumentError, "@vehicles is nil" if @vehicles.nil?
    Nokogiri::XML(open(predictionBaseUrl+key+'&vid='+@vehicles[index].to_s+'&top=1'))
  end

  def predictionBaseUrl
    'http://www.ctabustracker.com/bustime/api/v1/getpredictions?key='
  end

  def key
    KEY
  end 
end
