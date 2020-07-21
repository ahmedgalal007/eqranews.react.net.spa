using AngleSharp;
using AngleSharp.Dom;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eqranews.crawling
{
    public static class PageCrawler
    {
        public static async Task<IDocument> GetPage(Url sourceURL)
        {
            //Use the default configuration for AngleSharp
            var config = Configuration.Default.WithDefaultLoader();

            //Create a new context for evaluating webpages with the given config
            var context = BrowsingContext.New(config);

            //Parse the document from the content of a response to a virtual request
            var document = await context.OpenAsync(sourceURL.Href);
            return document;

        }
    }
}
