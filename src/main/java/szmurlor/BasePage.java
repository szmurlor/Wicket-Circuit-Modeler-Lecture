package szmurlor;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

public class BasePage extends WebPage {
	private static final long serialVersionUID = 1L;

    public BasePage(final PageParameters parameters) {
		super(parameters);

        add( new Link<Void>("linkHome") {
            @Override
            public void onClick() {
                setResponsePage(HomePage.class);
            }
        });
        add( new Link<Void>("linkCS") {
            @Override
            public void onClick() {
                setResponsePage(CircuitSimulatorPage.class);
            }
        });

    }
}
