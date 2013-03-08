import scala.collection.mutable.HashMap

class Article(raw: String) {
  val rawArticle = raw;
  val base : HashMap[String, Any] = format();
  
  def format() : HashMap[String,Any] = {
    new HashMap[String, Any]()
  }

  def save() = {
      //open mongoDB connection
      //look for matching article
      //if it exists, do nothing
      //else create an article and save it
  }
}
