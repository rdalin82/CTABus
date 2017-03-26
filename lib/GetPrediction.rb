require_relative './GetRoute'
require 'open-uri'
require 'nokogiri'
require_relative './Api'
require_relative './VehicleParser'
require 'geo-distance'

class GetPrediction
  include ApiKey
  include VehicleParser
  attr_accessor :vehicles, :result, :prediction, :vid, :dest, :stops, :stopName, :stopNum
  def initialize(get_route)
    @vehicles = get_route.vehicles
  end

  def request 
    @result = [] 
    @vehicles.each_with_index do |val, i| 
      r = nokoPredictionRequest(i)
      @result.push(r)
    end
    getPrediction()
    getStops()
  end

  def showStops
    begin
      @vehicles.each_with_index do |val, i|
        puts displayOutput(i)
     end
    rescue Exception => msg
      puts msg
    end
  end

  def getPrediction
    @prediction = []
    @result.each_with_index do |val, i|
      pred = @result[i].xpath('//prdtm')
      @prediction.push(pred)        
    end 
    predarr = []
    @prediction.each_with_index do |val, i|
      sPred = @prediction[i].to_s 
      sPred = sPred.scan(/[0-9][0-9]:[0-9][0-9]/)
      predarr.push(sPred[0])
    end
    @prediction = predarr
  end

  def getStops
    @stopNum = []
    @stopName = []
    @result.each_with_index do |val, i| 
      number = @result[i].xpath('//stpid')
      name = @result[i].xpath('//stpnm')    
      @stopNum.push(number)   
      @stopName.push(name)
    end    
    @stops = []   
    @result.each_with_index do |val, i|
      @stopName[i] = @stopName[i].to_s
      @stops.push([@stopNum, @stopName])
    end       
  end

  

  private 

  def displayOutput(index)
    "Bus #" + @vehicles[index].to_s + " next stop is " + @stopName[index].to_s[7...@stopName[index].length-9].gsub('amp;', '') + " at " + @prediction[index].to_s
  end

  def key
    KEY 
  end
  
  def getVid
    @vid = @result.xpath('//vid') 
  end

  def getRouteDest
    @dest = @result.xpath('//rtdst')
  end
end

