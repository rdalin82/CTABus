require_relative './Api'
require_relative './VehicleParser'
require_relative './ColorAssignment'

class GetRoute
  include ApiKey
  include VehicleParser
  include ColorAssignment
  attr_accessor :route, :destination, :results, :vehicles, :lat, :lon, :arr, :info, :distances, :directions
  
  def initialize(route_request)
    @route = route_request.route
    @destination = route_request.destination
  end
  
  def getResult
    vehicleFilter()
    results = {}
    distanceCalculator(results)
    distanceMaker(results)
  end

  def direction
    request()
    dir = @results.xpath('//des')
    arr = []
    dir.each do |i|
      text = i.inner_text.split("/")
      arr.push(text[0])
    end
    @directions = arr.uniq
  end
 
  def vehicleMaker
    results = {}
    @vehicles.each_with_index do |vehicle, i|
      bus = "bus#{i+1}"
      results[bus.to_sym] = {:bus => vehicle,:lat =>  @lat[i],:lon => @lon[i], :destination => @destination}
    end 
    results
  end 

  def request
    @results = nokoRouteRequest
  end
  #delete later? 
  # def route_url
  #   @destination.map { |x| x + "," }.reduce(:+)[0...-1]
  # end
end 
