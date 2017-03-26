require 'minitest/autorun'
require 'json'
require_relative '../lib/RouteRequest'
require_relative '../lib/GetRoute'
require_relative '../lib/GetPrediction'
#mark private methods public first
describe GetRoute do 
  def setup 
    data = File.open(File.expand_path('./tests/testdata.xml'))
    @data = Nokogiri::XML(open(data))
    @route = RouteRequest.new(78, "Harlem") 
    @getRoute = GetRoute.new(@route)
    @getRoute.results = @data
  end 

  #tests for clearning up methods, tests below here can be deleted later

  it "should have a working getLon method" do 
    @getRoute.getResult
    assert_respond_to @getRoute, (:getLon)
    assert_equal [-87.67376708984375, -87.76792727018658], @getRoute.lon 
  end

  it "should have a working getLat method" do 
    @getRoute.getResult
    assert_respond_to @getRoute, (:getLat)
    assert_equal [41.96162796020508, 41.960541574578535], @getRoute.lat 
  end
end