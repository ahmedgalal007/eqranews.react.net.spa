using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace eqranews.client.mvc.Extentions
{
    public static class StringReplaceNthOccurance
    {
        public static string ReplaceNthOccurance(this string obj, string find, string replace, int nthOccurance)
        {
            if (nthOccurance > 0)
            {
                var matchCollection = Regex.Matches(obj, Regex.Escape(find));
                if (matchCollection.Count >= nthOccurance)
                {
                    Match match = matchCollection[nthOccurance - 1];
                    return obj.Remove(match.Index, match.Length).Insert(match.Index, replace);
                }
            }
            return obj;
        }
    }
}

//< div >
	
//	@{

//	var entryHtml = entryViewModel.GetHtml();

//	// Get count of possible insert locations and if there is a sufficient number,
//	// inject ad script

//	string paragraphEndStr = "</p>";

//	int countParagraphEnds = entryHtml.Split(paragraphEndStr).Length - 1;

//	// Only do the insert if we have enough article text (counted by paragraphs)

//	if (countParagraphEnds > 2)
//	{
//		// This is the Adsense script to be inserted, replace this with your own, escaping quotes in the HTML

//		string insertHtml = @"
	
//			<div class=""mt-3 mb-3"">
//				<script async src=""https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js""></script>
//				<ins class=""adsbygoogle""
//				style=""display:block; text-align:center;""
//				data-ad-layout=""in-article""
//				data-ad-format=""fluid""
//				data-ad-client=""ca-pub-XXXXXXXXXXXXXXXX""
//				data-ad-slot=""XXXXXXXXXXX""></ins>
//				<script>
//				(adsbygoogle = window.adsbygoogle || []).push({});
//				</script>
//			</div>";

//		// Insert ad script in the middle of content (assuming paragraphs of the same length)

//		entryHtml = entryHtml.ReplaceNthOccurance(paragraphEndStr, paragraphEndStr + insertHtml, countParagraphEnds / 2);
//	}
//}
//</ div >
