require 'minitest/autorun'
require_relative '../lib/RouteRequest'

describe RouteRequest do 
  describe "initializes with route only" do 
    it "should respond to route" do 
      @route = RouteRequest.new(78) 
      assert_equal 78, @route.route
    end
    it "should not create a new route without params" do 
      assert_raises(ArgumentError) { RouteRequest.new() } 
    end 
  end 
  describe "initializes with route and destination" do 
    it "should respond to route and desintation" do 
      @route = RouteRequest.new(78, "Wilson") 
      assert_equal "Wilson", @route.destination 
    end
  end 
end 
