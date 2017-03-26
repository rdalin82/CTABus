require 'sinatra/base'
require 'sinatra/assetpack'
require 'sinatra/bootstrap'
require 'sinatra/json'
require 'sinatra/cookies'
require 'active_support'
require 'open-uri'
require 'nokogiri'
require 'geo-distance'
require 'sass'
require 'json'
require 'redis'
require 'omniauth'
require 'omniauth-facebook'
require 'cta_track'
require 'pry'
require './config.rb'
require './lib/GetPrediction'
require './lib/RouteRequest'
require './lib/GetRoute'
register Sinatra::Bootstrap::Assets
class CTABusTracker < Sinatra::Base
  helpers Sinatra::Cookies
  run! if app_file == $0

  get '/' do
    erb :index
  end

  get '/about' do
    erb :about
  end

  get '/api/routes' do
    @routes = {}
    request = CtaTrack::RouteFactory.new.result
    request.each do |key, value|
      @routes[key] = {name: request[key].name, number: request[key].number}
    end
    json @routes
  end

  get '/api/directions/:route' do
    json CtaTrack::Directions.new(params[:route]).dir
  end

  get '/api/stops/:route/:direction' do
    @stops = []
    request = CtaTrack::Stops.new( {:route=>params[:route], :direction=>params[:direction]} )
    request.keys.each do |key|
      @stops.push({:stopId => request.stpid(key), :stopName => request.stpnm(key)})
    end
    json @stops
  end

  get '/api/:route' do
  directions = []
    request =  CtaTrack::Vehicles.new({:routes=>params['route']})
    request.keys.each do |key|
      directions << request.des(key).split("/")[0]
    end
    json directions.uniq
  end

  get '/api/:route/:dest' do
    @routes = {}
    params['dest'].split(",").each do |dest|
      @routes.merge!(CtaTrack::Vehicles.new({:routes=>params['route']}).result.delete_if { |key, value| !value[:des].include?(dest) } )
    end
    json @routes
  end

  get "/api/prediction/:route/:stop" do
    json CtaTrack::Predictions.new(
      {:routes=>params[:route], :stopId=>params[:stop]}
      ).result
  end
end
