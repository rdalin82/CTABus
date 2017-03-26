require 'minitest/autorun'
require 'json'
require 'geo-distance'
require 'nokogiri'
require_relative '../lib/GetRoute'
require_relative '../lib/RouteRequest'
require_relative '../lib/GetPrediction'

describe GetPrediction do 
  def setup 
    data = File.open(File.expand_path('./tests/testdata.xml'))
    file1 = File.open(File.expand_path("./tests/FileOne.xml"))
    file2 = File.open(File.expand_path("./tests/FileTwo.xml"))
    @file1 = Nokogiri::XML(open(file1))
    @file2 = Nokogiri::XML(open(file2))
    @predictionData = [@file1, @file2]
    @data = Nokogiri::XML(open(data))
    @route = RouteRequest.new(78, "Harlem") 
    @getRoute = GetRoute.new(@route)
    @getRoute.results = @data
    @getRoute.getResult
    @prediction = GetPrediction.new(@getRoute)
    @prediction.result = @predictionData
  end 

  it "should have valid vehicles" do 
    vehicle1 = @prediction.vehicles[0]
    vehicle2 = @prediction.vehicles[1]
    assert_equal 6782, vehicle1
    assert_equal 6603, vehicle2
  end 

  it "should have valid results" do 
    assert_equal Nokogiri::XML::Document, @prediction.result[0].class
  end

  it "should respond to request" do 
    assert_respond_to @prediction, :request
  end 
  it "should respond to showStops" do 
    @prediction.getStops
    assert_equal "<stpnm>Montrose &amp; Rockwell</stpnm>", @prediction.stopName[0]
    assert_respond_to @prediction, :showStops
  end 

  it "should have results" do 
    @prediction.getPrediction
    assert_equal 2, @prediction.result.length
    assert_equal Nokogiri::XML::Document, @prediction.result[0].class
    assert @prediction.prediction
    refute_equal nil, @prediction.vehicles
  end
  it "should have stops" do 
    @prediction.request
    assert_respond_to @prediction, :stops
  end
end 