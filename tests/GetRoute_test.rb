require 'minitest/autorun'
require 'json'
require 'geo-distance'
require_relative '../lib/GetRoute'
require_relative '../lib/RouteRequest'
require_relative '../lib/GetPrediction'

describe GetRoute do 
  
  def setup 
    data = File.open(File.expand_path('./tests/testdata.xml'))
    @data = Nokogiri::XML(open(data))
    @route = RouteRequest.new(78, "Harlem") 
    @getRoute = GetRoute.new(@route)
    @getRoute.results = @data
  end 

  it "should respond to results with" do 
    assert_respond_to @getRoute, :results 
  end 

  it "should have a valid route request" do 
    @getRoute.getResult 
    assert @getRoute
    assert @getRoute.route 
    assert @getRoute.destination
    assert @getRoute.distances
    assert @getRoute.vehicles 
  end 

  it "should return correct distances with getResult" do 
    @getRoute.getResult
    assert_equal ["6782 and 6603 are 4.84 miles apart"], @getRoute.distances
  end 

  it "should return correct vehicles" do 
    @getRoute.getResult
    assert_equal [6782, 6603], @getRoute.vehicles 
  end 

  it "should have correct color" do 
    @getRoute.getResult
    color = {:background=>"#A5D900", :font=>"black"}
    assert_equal color, @getRoute.color
  end 

  it "should have a vehicleMaker" do 
    @getRoute.getResult
    result = @getRoute.vehicleMaker
    assert_equal Hash, result.class
    assert_equal 2, result.length
    assert_equal 6782, result[:bus1][:bus]
  end

  it "should have a vehicleMaker and respond to json" do 
    @getRoute.getResult
    result = @getRoute.vehicleMaker
    assert_equal Symbol, result.keys[0].class
    assert result.to_json
  end
end

