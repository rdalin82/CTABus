class RouteRequest
  attr_reader :route, :destination
  def initialize(route, destination = nil)
    @route = route
    @destination = destination || nil
  end
end