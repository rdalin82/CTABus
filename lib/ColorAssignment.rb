module ColorAssignment
  def color
    getResult() if @info.nil?
    a = []
    begin
      @info.each do |k, v|
        numb = v.to_f
        a.push(numb)
      end
      num = a.sort
      if num[0] <= 0.1
        #red
        col = {
          background: "#b03060", 
          font: "white"
        }
      elsif num[0] < 1.0
        #orange
        col = {
          background: "#FF930E", 
          font: "white"
        }
      elsif num[0] < 1.5
        #yellow
        col = {
          background: "#F2E926",
          font: "black"
        }
      elsif num[0] < 3.0
        #blue
        col = {
          background: "#003B59", 
          font: "white"
        }
      else
        #green
        col = {
          background: "#A5D900",
          font: "black"
        }
      end
    rescue 
      col = {
        background:"#d3d3d3",
        font: "black"
      }
    end 
    col
  end 
end 